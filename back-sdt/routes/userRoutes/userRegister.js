// --- IMPORTACIONES DE INFRAESTRUCTURA SDT ---
const asyncHandler = require('express-async-handler');
const User = require('../../models/User'); // Ruta verificada para arquitectura limpia
const jwt = require('jsonwebtoken');

/**
 * @description Registro de Usuario con Auto-Login (Flujo Software DT)
 * @access Public
 */
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    // 1. Validaciones de entrada - Fail Fast (Estilo Elon Musk)
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Protocolo incompleto: Nombre, email y password son requeridos.' 
        });
    }

    // 2. Verificar existencia en el Datacenter
    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ 
            success: false, 
            message: 'Conflicto: El nodo (usuario) ya está registrado en el sistema.' 
        });
    }

    // 3. Crear usuario (Mongoose middleware .pre('save') se encarga del hash)
    const result = await User.create({
        name,
        email,
        photo: photo || 'https://placehold.co/400x400?text=SDT',
        password, 
        customMessage: "Hola Software DT, solicito soporte técnico."
    });

    if (result) {
        // Definimos el rol estándar de Software DT (Default 1002)
        const userRole = result.roles?.usuario || 1002;

        // 4. GENERACIÓN ATÓMICA DE TOKENS (Protocolo de Acceso Inmediato)
        const accessToken = jwt.sign(
            { 
                UserInfo: {
                    id: result._id, 
                    email: result.email, 
                    role: userRole 
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

        // 5. Persistencia del Refresh Token para multidispositivo
        // Inicializamos el array con el primer token
        result.refreshToken = [refreshToken];
        await result.save();

        // 6. Configuración de Cookie de Seguridad (Standard HTTPOnly)
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true, // Siempre true para producción/clase mundial
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });

        // 7. Respuesta de éxito - Sincronizada con el Frontend Software DT
        res.status(201).json({
            success: true,
            message: 'Nodo vinculado e identificado exitosamente en Software DT',
            accessToken,
            user: { 
                _id: result._id, 
                name: result.name, 
                email: result.email,
                role: userRole,
                photo: result.photo,
                location: "Bogotá, Colombia",
                experience: "5.5 años de consistencia"
            }
        });
    } else {
        res.status(500).json({ 
            success: false, 
            message: 'Error de infraestructura: No se pudo inicializar el nuevo nodo.' 
        });
    }
});

// Exportación del módulo para uso en enrutadores
module.exports = { userRegister };