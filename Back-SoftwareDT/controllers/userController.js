import asyncHandler from 'express-async-handler';
import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * 🛰️ SOFTWARE DT - AUTH & USER CONTROLLER (Nivel S+)
 * Objetivo: Estabilizar el Handshake de Registro/Login y eliminar errores 500/401.
 */

// --- 1. REGISTRO DE USUARIO (NODE LINK) ---
export const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Protocolo incompleto: faltan credenciales' });
    }

    const cleanEmail = email.toLowerCase().trim();
    
    const userexist = await User.findOne({ email: cleanEmail }).lean();
    if (userexist) {
        return res.status(409).json({ success: false, message: 'Identidad ya registrada en el ecosistema' });
    }

    const newUser = new User({
        name: name.trim(),
        email: cleanEmail,
        photo: photo || 'https://placehold.co/400x400?text=SDT_USER',
        password, 
        roles: { user: 1002 }
    });

    const result = await newUser.save();

    if (result) {
        const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
        const accessToken = jwt.sign(
            { UserInfo: { id: result._id, email: result.email, roles: [1002] } }, 
            secret,
            { expiresIn: '2h' }
        );

        console.log(`🚀 [NODE_CREATED]: Nuevo Arquitecto registrado -> ${result.email}`);

        res.status(201).json({
            success: true,
            accessToken,
            token: accessToken, 
            user: { 
                _id: result._id, 
                name: result.name, 
                email: result.email,
                roles: [1002]
            }
        });
    } else {
        res.status(500).json({ success: false, message: 'Error de persistencia crítica en DT1' });
    }
});

// --- 2. LOGIN DE USUARIO (AUTH PROTOCOL) ---
export const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Credenciales requeridas' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const foundUser = await User.findOne({ email: cleanEmail }).select('+password').exec();
    
    if (!foundUser) {
        console.error(`❌ [AUTH_FAIL]: Email no existe -> ${cleanEmail}`);
        return res.status(401).json({ success: false, message: 'Acceso denegado: Nodo inexistente' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        console.error(`❌ [AUTH_FAIL]: Password incorrecto -> ${cleanEmail}`);
        return res.status(401).json({ success: false, message: 'Acceso denegado: Credenciales inválidas' });
    }

    const activeRoles = foundUser.roles ? Object.values(foundUser.roles).filter(Boolean) : [1002];

    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;

    const accessToken = jwt.sign(
        { UserInfo: { id: foundUser._id, email: foundUser.email, roles: activeRoles } }, 
        secret,
        { expiresIn: '2h' }
    );

    const refreshToken = jwt.sign(
        { id: foundUser._id },
        refreshSecret,
        { expiresIn: '7d' }
    );

    let newRefreshTokenArray = Array.isArray(foundUser.refreshToken) ? foundUser.refreshToken : [];
    if (newRefreshTokenArray.length >= 5) newRefreshTokenArray.shift();
    
    foundUser.refreshToken = [...newRefreshTokenArray, refreshToken];
    await foundUser.save();

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(`✅ [AUTH_SUCCESS]: Handshake completo -> ${foundUser.email}`);

    res.status(200).json({ 
        success: true, 
        accessToken,
        token: accessToken, 
        user: {
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            photo: foundUser.photo,
            roles: activeRoles
        }
    });
});

// --- 3. LOGOUT (TERMINATE) ---
export const handleUserLogout = asyncHandler(async (req, res) => {
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

// --- 🛡️ 4. ACTUALIZAR DETALLES DE USUARIO (NIVEL S+) ---
// Añadido para solucionar el crash de Node en Railway y Local
export const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.user; // Se asume que viene del middleware de autenticación
    const { name, photo } = req.body;

    const foundUser = await User.findById(id);
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    if (name) foundUser.name = name.trim();
    if (photo) foundUser.photo = photo;

    const updatedUser = await foundUser.save();

    console.log(`🚀 [NODE_UPDATED]: Perfil actualizado -> ${updatedUser.email}`);

    res.status(200).json({
        success: true,
        message: 'Perfil de Software DT actualizado con éxito',
        user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            roles: updatedUser.roles ? Object.values(updatedUser.roles).filter(Boolean) : [1002]
        }
    });
});