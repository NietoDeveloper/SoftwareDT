const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "No session cookie found" });
    
    const refreshToken = cookies.jwt;
    
    // 1. Limpiamos la cookie para rotación inmediata
    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: "None", 
        secure: true 
    });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // --- ESCENARIO: DETECCIÓN DE REÚSO (POSIBLE ROBO DE TOKEN) ---
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); 
                
                // Si el token es válido pero no está en la DB, compromiso de seguridad.
                const hackedUser = await User.findById(decoded.id).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = []; // Borramos todas las sesiones activas
                    await hackedUser.save();
                    console.log(`🚨 CRITICAL: Refresh token reuse detected for ${hackedUser.email}`);
                }
            }
        );
        return res.sendStatus(403);
    }

    // --- PROCESO NORMAL: ROTACIÓN DE TOKEN ---
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                foundUser.refreshToken = [...newRefreshTokenArray];
                await foundUser.save();
                return res.sendStatus(403); // Token expirado
            }

            if (foundUser._id.toString() !== decoded.id) return res.sendStatus(403);

            // Generamos nuevos tokens
            const accessToken = jwt.sign(
                { id: decoded.id, role: foundUser.role }, // Inyectamos el rol aquí
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            const newRefreshToken = jwt.sign(
                { id: foundUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Actualizamos DB
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await foundUser.save();

            // Enviamos la nueva cookie de larga duración
            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000 
            });

            // Enviamos el Access Token y datos básicos para que el Front no quede a ciegas
            res.json({ 
                accessToken,
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    role: foundUser.role
                }
            });
        }
    );
});

module.exports = { handleRefreshToken };