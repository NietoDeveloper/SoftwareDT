const asyncHandler = require('express-async-handler');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- 1. Registro de Usuario ---
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });

    const userexist = await User.findOne({ email });
    if (userexist) return res.status(409).json({ success: false, message: 'El usuario ya existe' });

    const hashedpassword = await bcrypt.hash(password, 10);
    
    const result = await User.create({
        name,
        email,
        photo: photo || null,
        password: hashedpassword,
        // Inicializamos el mensaje por defecto estilo SDT
        customMessage: "Hola Software DT, solicito soporte técnico para mi clúster."
    });

    if (result) {
        res.status(201).json({
            success: true,
            message: 'Usuario creado con éxito',
            user: { id: result._id, name: result.name, email: result.email }
        });
    } else return res.status(500).json({ message: 'Error al crear usuario' });
});

// --- 2. Inicio de Sesión ---
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Credenciales requeridas' });
    }

    const foundUser = await User.findOne({ email }).select('+password').exec();
    
    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const accessToken = jwt.sign(
        { id: foundUser._id, email: foundUser.email, role: foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    foundUser.refreshToken = [...(foundUser.refreshToken || []), refreshToken];
    await foundUser.save();

    // AJUSTE PARA EL PANEL: Incluimos customMessage para el frontend
    const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        photo: foundUser.photo,
        role: foundUser.role,
        phone: foundUser.phone,
        customMessage: foundUser.customMessage, // <--- CRÍTICO PARA EL ASIDE
        location: "Bogotá, Colombia",
        experience: "5.5 años"
    };

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, accessToken, userData, message: 'Login exitoso' });
});

// --- 3. Actualizar Detalles (Sincronización con Datacenter) ---
const updateUserDetails = asyncHandler(async (req, res) => {
    // Aceptamos el ID de params o del token decodificado para mayor seguridad
    const id = req.params.id || req.id; 
    if (!id) return res.status(400).json({ message: 'ID requerido' });

    const { name, email, password, bloodType, gender, phone, photo, customMessage } = req.body;
    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'Email ya en uso' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = await bcrypt.hash(password, 10);
    if (bloodType) foundUser.bloodType = bloodType;
    if (gender) foundUser.gender = gender;
    if (phone) foundUser.phone = phone;
    if (photo) foundUser.photo = photo;
    
    // NUEVO: Persistencia de la plantilla de mensaje
    if (customMessage !== undefined) foundUser.customMessage = customMessage;

    const updated = await foundUser.save();
    
    res.status(200).json({ 
        success: true, 
        message: 'DATACENTER ACTUALIZADO', // Mensaje estilo Software DT
        data: {
            _id: updated._id,
            name: updated.name,
            customMessage: updated.customMessage,
            phone: updated.phone
        } 
    });
});

// --- 4. Logout ---
const handleUserLogout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    
    if (foundUser) {
        foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);
        await foundUser.save();
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
});

module.exports = { userRegister, userLogin, updateUserDetails, handleUserLogout };