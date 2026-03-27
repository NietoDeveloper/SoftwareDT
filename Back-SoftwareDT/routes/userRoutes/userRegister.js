import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js'; 

const router = express.Router();

/**
 * SOFTWARE DT - REGISTRO DE NODOS (Nivel S+)
 * @route   POST /api/user/register
 */
router.post('/', asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    // 1. Validación de Entrada
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Protocolo incompleto: Credenciales requeridas.' 
        });
    }

    // 2. Verificación de Duplicidad en Datacenter
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(409).json({ 
            success: false, 
            message: 'Conflicto: Nodo ya registrado en el Datacenter.' 
        });
    }

    // 3. Creación del Nodo con el nuevo Key 'user'
    // Se asigna 1002 por defecto para nuevos registros
    const result = await User.create({
        name,
        email,
        photo: photo || 'https://placehold.co/400x400?text=SDT',
        password, 
        roles: { user: 1002 }, 
        customMessage: "Hola Software DT, solicito soporte técnico."
    });

    if (result) {
        // Acceso consistente al nuevo key 'user'
        const userRole = result.roles?.user || 1002;
        
        // 4. Generación de Payload Sincronizado
        // Mantenemos 'roles' para el array de verifyAccess pero mapeado desde 'user'
        const accessToken = jwt.sign(
            { 
                UserInfo: { 
                    id: result._id, 
                    email: result.email, 
                    roles: [userRole] // Enviamos como array para el interceptor
                } 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: result._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' }
        );

        // 5. Persistencia de Sesión
        result.refreshToken = [refreshToken];
        await result.save();

        // 6. Configuración de Seguridad en Cookie (Railway/Vercel Ready)
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000,
        });

        // 7. Respuesta Exitosa
        res.status(201).json({
            success: true,
            message: 'Nodo vinculado exitosamente a Software DT',
            accessToken,
            user: { 
                _id: result._id, 
                name: result.name, 
                email: result.email, 
                role: userRole,
                location: "Bogotá, Colombia"
            }
        });
    } else {
        res.status(500).json({ 
            success: false, 
            message: 'Fallo crítico de infraestructura al inicializar el nodo.' 
        });
    }
}));

export default router;