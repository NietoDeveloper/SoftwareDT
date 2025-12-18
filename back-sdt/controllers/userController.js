const asyncHandler = require('express-async-handler');
// La ruta ha sido corregida de '../../models/User' a '../models/User'
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ----------------------------------------------------------------------
// --- 1. Registro de Usuario (userRegister) ---
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo} = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'all credentials are required' });

    const userexist = await User.findOne({ email });
    if (userexist) return res.status(409).json({ message: 'User already exists! login instead' });

    // Hashing de la contraseña
    const hashedpassword = await bcrypt.hash(password, 10);
    
    //store the user details in the database
    const result = await User.create({
        name,
        email,
        photo,
        password: hashedpassword,
    });
    console.log(result);

    if (result) {
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                photo: result.photo,
            }, });
    } else return res.status(500).json({ message: 'Something went wrong' });
});

// ----------------------------------------------------------------------
// --- 2. Inicio de Sesión (userLogin) ---
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // --- CÓDIGO DE DEPURACIÓN TEMPORAL ---
    console.log('--- LOGIN ATTEMPT ---');
    console.log(`Received email: ${email}`);
    console.log(`Received password (WARNING: Plaintext): ${password}`); 
    // ---------------------------------------

    if (!email || !password) {
        return res.status(400).json({ message: 'Login credentials required!' });
    }

    // Encuentra el usuario e incluye explícitamente el hash de la contraseña (select('+password'))
    const foundUser = await User.findOne({ email }).select('+password').exec();
    
    // --- CÓDIGO DE DEPURACIÓN TEMPORAL ---
    console.log(`User found in DB: ${!!foundUser}`);
    // ---------------------------------------

    // Si el usuario no existe O las credenciales son inválidas
    if (!foundUser) {
        console.log('DEBUG: User not found in database.');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const match = await bcrypt.compare(password, foundUser.password);
    
    // --- CÓDIGO DE DEPURACIÓN TEMPORAL ---
    console.log(`Password match result: ${match}`);
    // ---------------------------------------

    if (!match) {
        console.log('DEBUG: Password mismatch.');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Create access token
    const accessToken = jwt.sign(
        { id: foundUser._id, email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
        { id: foundUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    // Añade el nuevo token de actualización al array
    foundUser.refreshToken = [...(foundUser.refreshToken || []), refreshToken];
    await foundUser.save();

    const userData = await User.findById(foundUser._id).select('-password -refreshToken -email');

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        secure: process.env.NODE_ENV === 'production' || true, 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ accessToken, userData, message: 'Login successful' });
});

const updateUserDetails = asyncHandler(async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ message: 'User id required!' });

    const foundUser = await User.findOne({ _id: req.params.id }).exec();
    if (!foundUser) {
        return res.status(404).json({ message: 'No user with that ID was found' }) 
    };
    const { name, email, password, bloodType, gender, phone, photo } = req.body;
    
    // Evitar duplicidad de email si el email cambia
    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'The new email address is already in use' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = await bcrypt.hash(password, 10);
    if (bloodType) foundUser.bloodType = bloodType;
    if (gender) foundUser.gender = gender;
    if (phone) foundUser.phone = phone;
    if (photo) foundUser.photo = photo;

    await foundUser.save();
    res.status(200).json({ message: 'User details updated successfully!' });
}); // <-- AÑADIDA LLAVE DE CIERRE FALTANTE

// ----------------------------------------------------------------------
// --- 4. Cierre de Sesión (handleUserLogout) ---
const handleUserLogout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }
    
    const refreshToken = cookies.jwt;
    
    // Check if the refresh token is in the database
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // Limpia la cookie incluso si el token no está en la DB
        res.clearCookie('jwt', { 
            httpOnly: true, 
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production' || true,
        });
        return res.sendStatus(204);
    }

    // Delete the refresh token from the database
    foundUser.refreshToken = foundUser.refreshToken.filter(token => token !== refreshToken);
    await foundUser.save();

    // Clear the refresh token cookie
    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production' || true,
    });
    res.sendStatus(204);
}); // <-- AÑADIDA LLAVE DE CIERRE FALTANTE

module.exports = { userRegister, userLogin, updateUserDetails, handleUserLogout};