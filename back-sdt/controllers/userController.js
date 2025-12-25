const asyncHandler = require('express-async-handler');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- 1. Registro de Usuario (Ajustado para Modelo SDT) ---
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ success: false, message: 'El usuario ya existe en el Datacenter' });
    }

    // ELIMINADO: const hashedpassword = await bcrypt.hash(password, 10);
    // El modelo User.js se encarga de esto automáticamente gracias al middleware pre-save.
    
    const result = await User.create({
        name,
        email,
        photo: photo || null,
        password, // <--- Enviamos texto plano, el modelo lo encripta
        customMessage: "Hola Software DT, solicito soporte técnico para mi clúster."
    });

    if (result) {
        res.status(201).json({
            success: true,
            message: 'Usuario vinculado exitosamente al Datacenter',
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

    // Obtenemos el usuario y forzamos la selección del password (que tiene select: false)
    const foundUser = await User.findOne({ email }).select('+password').exec();
    
    if (!foundUser) {
        console.log(`[AUTH ERROR]: Email no encontrado: ${email}`);
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Comparamos el texto plano con el hash de la DB
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        console.log(`[AUTH ERROR]: Contraseña incorrecta para: ${email}`);
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    // Generación de Tokens SDT
    const accessToken = jwt.sign(
        { id: foundUser._id, email: foundUser.email, role: foundUser.roles?.usuario },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    // Guardar Refresh Token en el array (Soporte multidispositivo)
    foundUser.refreshToken = [...(foundUser.refreshToken || []), refreshToken];
    await foundUser.save();

    const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        photo: foundUser.photo,
        role: foundUser.roles?.usuario || 1002,
        phone: foundUser.phone || '',
        customMessage: foundUser.customMessage,
        location: "Bogotá, Colombia",
        experience: "5.5 años"
    };

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
        success: true, 
        accessToken, 
        user: userData, 
        message: 'Acceso autorizado al Datacenter' 
    });
});

// --- 3. Actualizar Detalles ---
const updateUserDetails = asyncHandler(async (req, res) => {
    const id = req.params.id || req.id; 
    if (!id) return res.status(400).json({ message: 'ID de terminal requerido' });

    const { name, email, password, phone, photo, customMessage } = req.body;
    const foundUser = await User.findById(id).select('+password');

    if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'Email ya vinculado a otra terminal' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = password; // El modelo detectará el cambio y hará el hash
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