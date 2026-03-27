import User from '../models/User.js'; 
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

/**
 * 🔐 SOFTWARE DT - REFRESH TOKEN PROTOCOL
 * Implementa rotación de tokens y detección de intrusos.
 */
export const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    
    // Si no hay cookie JWT, el nodo no está autenticado
    if (!cookies?.jwt) return res.status(401).json({ message: "No session cookie found" });
    
    const refreshToken = cookies.jwt;
    
    // Limpieza preventiva: Rotación inmediata para evitar ataques de repetición
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
                
                // Si el token es válido pero no está en la DB, significa que ya fue usado.
                // Reset total por seguridad: el usuario deberá loguearse de nuevo en todos sus dispositivos.
                const hackedUser = await User.findById(decoded.id).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = []; 
                    await hackedUser.save();
                    console.warn(`🚨 [SECURITY BREACH]: Token reuse detected for ${hackedUser.email}. All sessions invalidated.`);
                }
            }
        );
        return res.sendStatus(403);
    }

    // Filtrar el token actual para reemplazarlo por uno nuevo (Rotación)
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // --- PROCESO NORMAL: VALIDACIÓN Y EMISIÓN ---
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // Si el token expiró, actualizamos la lista removiendo el token inválido
                foundUser.refreshToken = [...newRefreshTokenArray];
                await foundUser.save();
                return res.sendStatus(403); 
            }

            // Verificación de integridad de identidad
            if (foundUser._id.toString() !== decoded.id) return res.sendStatus(403);

            // Sincronización de Roles (Normalizado a Array para el Frontend)
            const rolesArray = Object.values(foundUser.roles).filter(Boolean);

            // Generamos nuevos tokens con la estructura UserInfo (S+ Standard)
            const accessToken = jwt.sign(
                { 
                    UserInfo: { 
                        id: foundUser._id, 
                        email: foundUser.email, 
                        roles: rolesArray 
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            const newRefreshToken = jwt.sign(
                { id: foundUser._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Sincronizamos el Datacenter con el nuevo set de tokens
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await foundUser.save();

            // Inyectamos la nueva cookie segura
            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                sameSite: "None",
                secure: true, 
                maxAge: 24 * 60 * 60 * 1000 
            });

            // Respuesta para el Store de Zustand o Contexto global
            res.json({ 
                success: true,
                accessToken,
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    roles: rolesArray
                }
            });
        }
    );
});