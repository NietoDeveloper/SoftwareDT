const asyncHandler = require('express-async-handler');
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --- 1. Registro de Usuario (Con Auto-Login de Clase Mundial) ---
const userRegister = asyncHandler(async (req, res) => {


    const refreshToken = jwt.sign(
        { id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    foundUser.refreshToken = [...(foundUser.refreshToken || []), refreshToken];
    await foundUser.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
        success: true, 
        accessToken, 
        user: {
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            photo: foundUser.photo,
            role: userRole,
            location: "Bogotá, Colombia"
        }
    });
});

// --- 3. Actualizar Detalles (Update) ---
const updateUserDetails = asyncHandler(async (req, res) => {
    const id = req.params.id || req.id; 
    const { name, email, password, phone, photo, customMessage } = req.body;
    
    const foundUser = await User.findById(id).select('+password');
    if (!foundUser) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ success: false, message: 'Email ya en uso por otro nodo' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = password; 
    if (phone) foundUser.phone = phone;
    if (photo) foundUser.photo = photo;
    if (customMessage !== undefined) foundUser.customMessage = customMessage;

    const updated = await foundUser.save();
    
    res.status(200).json({ 
        success: true, 
        message: 'DATACENTER ACTUALIZADO',
        user: { 
            _id: updated._id, 
            name: updated.name,
            email: updated.email,
            role: updated.roles?.usuario || 1002
        } 
    });
});

// --- 4. Logout (Cierre de Sesión) ---
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