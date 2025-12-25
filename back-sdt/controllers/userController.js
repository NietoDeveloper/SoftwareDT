const asyncHandler = require('express-async-handler');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- 1. Registro de Usuario ---
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ success: false, message: 'El usuario ya existe en el Datacenter' });
    }

    // Nota: Si tu modelo User ya tiene un pre('save') para hash, no lo hagas aquí. 
    // Si no lo tiene, este paso es correcto:
    const hashedpassword = await bcrypt.hash(password, 10);
    
    const result = await User.create({
        name,
        email,
        photo: photo || null,
        password: hashedpassword,
        customMessage: "Hola Software DT, solicito soporte técnico para mi clúster."
    });

    if (result) {
        res.status(201).json({
            success: true,
            message: 'Usuario vinculado exitosamente',
            user: { _id: result._id, name: result.name, email: result.email }
        });
    } else {
        res.status(500).json({ success: false, message: 'Error de infraestructura al crear usuario' });
    }
});

// --- 2. Inicio de Sesión (Login) ---
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Credenciales requeridas' });
    }

    // Buscamos usuario incluyendo el password que suele estar oculto por defecto
    const foundUser = await User.findOne({ email }).select('+password').exec();
    
    if (!foundUser) {
        console.log(`[AUTH ERROR]: Email no encontrado: ${email}`);
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        console.log(`[AUTH ERROR]: Contraseña incorrecta para: ${email}`);
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Generación de Tokens
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

    // Persistencia del Refresh Token
    foundUser.refreshToken = [...(foundUser.refreshToken || []), refreshToken];
    await foundUser.save();

    // Estructura de Usuario para el Frontend (Software DT Standard)
    const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        photo: foundUser.photo,
        role: foundUser.role || 'user',
        phone: foundUser.phone || '',
        customMessage: foundUser.customMessage,
        location: "Bogotá, Colombia", // Datos de tu perfil de experto
        experience: "5.5 años"
    };

    // Cookie segura
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000,
    });

    // Respuesta unificada que el frontend espera
    res.status(200).json({ 
        success: true, 
        accessToken, 
        user: userData, // Cambiado de userData a user para match total con el frontend
        message: 'Acceso autorizado al Datacenter' 
    });
});

// --- 3. Actualizar Detalles ---
const updateUserDetails = asyncHandler(async (req, res) => {
    const id = req.params.id || req.id; 
    if (!id) return res.status(400).json({ message: 'ID de terminal requerido' });

    const { name, email, password, bloodType, gender, phone, photo, customMessage } = req.body;
    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Lógica de actualización
    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'Canal de comunicación (email) ya en uso' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = await bcrypt.hash(password, 10);
    if (phone) foundUser.phone = phone;
    if (photo) foundUser.photo = photo;
    if (customMessage !== undefined) foundUser.customMessage = customMessage;

    const updated = await foundUser.save();
    
    res.status(200).json({ 
        success: true, 
        message: 'DATACENTER ACTUALIZADO', 
        data: {
            _id: updated._id,
            name: updated.name,
            email: updated.email,
            customMessage: updated.customMessage,
            phone: updated.phone,
            photo: updated.photo
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