const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// --- INFRAESTRUCTURA DE CLASE MUNDIAL SOFTWARE DT ---
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false, 
            message: 'Protocolo incompleto: Credenciales requeridas.' 
        });
    }

    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ 
            success: false, 
            message: 'Conflicto: Nodo ya registrado en el sistema.' 
        });
    }

    const result = await User.create({
        name,
        email,
        photo: photo || 'https://placehold.co/400x400?text=SDT',
        password, 
        customMessage: "Hola Software DT, solicito soporte técnico."
    });

    if (result) {
        const userRole = result.roles?.usuario || 1002;

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

        result.refreshToken = [refreshToken];
        await result.save();

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
            maxAge: 24 * 60 * 60 * 1000,
        });

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