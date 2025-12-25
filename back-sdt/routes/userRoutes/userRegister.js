// --- INFRAESTRUCTURA DE CLASE MUNDIAL SOFTWARE DT ---
const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Si falla aquí, usa '../../models/User' dependiendo de tu carpeta
const jwt = require('jsonwebtoken');

/**
 * @description Registro de Usuario con Inyección de Protocolo Software DT
 * @access Public
 */
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    // 1. Fail Fast: Validación Estilo Elon Musk
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Protocolo incompleto: Credenciales requeridas.' 
        });
    }

    // 2. Verificación de Nodo Duplicado en Datacenter
    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ 
            success: false, 
            message: 'Conflicto: Nodo ya registrado en el sistema.' 
        });
    }

    // 3. Creación del Usuario (El middleware .pre('save') de User.js maneja el hash)
    const result = await User.create({
        name,
        email,
        photo: photo || 'https://placehold.co/400x400?text=SDT',
        password, 
        customMessage: "Hola Software DT, solicito soporte técnico."
    });

    if (result) {
        // Rol Estándar SDT: 1002
        const userRole = result.roles?.usuario || 1002;

        // 4. Generación Atómica de Tokens
        const accessToken = jwt.sign(
            { UserInfo: { id: result._id, email: result.email, role: userRole } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: result._id }, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: '1d' }
        );

        // 5. Persistencia y Rotación (Soporte Multidispositivo)
        result.refreshToken = [refreshToken];
        await result.save();

        // 6. Cookie de Seguridad HTTPOnly
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000,
        });

        // 7. Respuesta Sincronizada con Frontend
        res.status(201).json({
            success: true,
            message: 'Nodo vinculado exitosamente a Software DT',
            accessToken,
            user: { 
                _id: result._id, 
                name: result.name, 
                email: result.email,
                role: userRole,
                location: "Bogotá, Colombia",
                experience: "5.5 años de consistencia"
            }
        });
    } else {
        res.status(500).json({ 
            success: false, 
            message: 'Error de infraestructura: No se pudo inicializar el nodo.' 
        });
    }
});

module.exports = { userRegister };