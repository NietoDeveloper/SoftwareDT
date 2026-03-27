import Product from '../models/Product.js'; 
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

/**
 * SDT AUTH PROTOCOL: Refresh Token para Productos (S+ Tier)
 * Sincronización exacta con verifyAccess.js y loginProduct.
 */
export const handleProductRefreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    
    // 1. Verificación de existencia de la cookie JWT
    if (!cookies?.jwt) {
        console.log("⚠️ [SDT_AUTH]: Intento de refresh sin cookie válida.");
        return res.sendStatus(401);
    }
    
    const refreshToken = cookies.jwt;

    // 2. Localización del nodo (Incluimos refreshToken porque en el modelo es select: false)
    const foundProduct = await Product.findOne({ refreshToken }).select('+refreshToken').exec();
    
    if (!foundProduct) {
        console.log("🚫 [SDT_AUTH]: Token no encontrado o revocado del Datacenter.");
        return res.sendStatus(403); 
    }

    // 3. Validación del Token y Generación de nuevo Access Token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            // Verificamos error de expiración o discrepancia de identidad
            const decodedId = decoded.id || decoded.UserInfo?.id;
            
            if (err || foundProduct._id.toString() !== decodedId) {
                console.log("❌ [SDT_AUTH]: Token expirado o ID no coincide.");
                return res.sendStatus(403);
            }

            // Normalización de Roles: Extraemos valores numéricos [1001, ...]
            const roles = Object.values(foundProduct.roles).filter(role => typeof role === 'number');
            
            // PAYLOAD CRÍTICO: Sincronizado con el estado global de Zustand en el front
            const accessToken = jwt.sign(
                { 
                    "UserInfo": { 
                        "id": foundProduct._id, 
                        "email": foundProduct.email,
                        "roles": roles 
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // Tiempo recomendado para Access Tokens S+
            );

            console.log(`💓 [SDT_AUTH]: Sesión renovada -> ${foundProduct.name}`);
            
            res.json({ 
                success: true,
                accessToken, 
                roles 
            });
        }
    );
});