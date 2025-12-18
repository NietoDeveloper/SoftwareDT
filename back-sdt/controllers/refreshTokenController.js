const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    // Buscamos la cookie llamada 'jwt'
    if (!cookies?.jwt) return res.sendStatus(401);
    
    const refreshToken = cookies.jwt;
    
    // Limpiamos la cookie vieja para prepararnos para la rotación
    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: "None", 
        secure: true 
    });

    // Intentamos encontrar al usuario que posea este token específico en su lista
    const foundUser = await User.findOne({ refreshToken }).exec();

    // --- DETECCIÓN DE REÚSO (Posible Hack) ---
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); // Token expirado o inválido
                
                // Si el token es válido pero no está en la DB, alguien ya lo usó.
                // Invalidamos TODA la sesión de ese usuario por seguridad.
                const hackedUser = await User.findById(decoded.id).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = [];
                    await hackedUser.save();
                    console.log(`⚠️ Alerta de seguridad: Sesiones invalidadas para ${hackedUser.email}`);
                }
            }
        );
        return res.sendStatus(403);
    }

    // --- PROCESO NORMAL DE ROTACIÓN ---
    // Filtramos el token actual del arreglo de la base de datos
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, // Corregido el nombre de la variable
        async (err, decoded) => {
            if (err) {
                // Si el token expiró, solo guardamos el arreglo filtrado (eliminando el expirado)
                foundUser.refreshToken = [...newRefreshTokenArray];
                await foundUser.save();
                return res.sendStatus(403);
            }

            // Validamos que el ID del token coincida con el usuario encontrado
            if (foundUser._id.toString() !== decoded.id) return res.sendStatus(403);

            // Generamos el nuevo par de tokens
            const accessToken = jwt.sign(
                { id: decoded.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // 15 minutos es estándar para Access Tokens
            );

            const newRefreshToken = jwt.sign(
                { id: foundUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Guardamos el nuevo token en el arreglo de Atlas (sdt)
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await foundUser.save();

            // Enviamos la nueva cookie
            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true, // Requerido para SameSite=None
                maxAge: 24 * 60 * 60 * 1000 // 1 día en milisegundos
            });

            // Enviamos el Access Token al frontend
            res.json({ accessToken });
        }
    );
});

module.exports = { handleRefreshToken };