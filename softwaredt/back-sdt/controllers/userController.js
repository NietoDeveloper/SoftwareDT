const asyncHandler = require('express-async-handler');
// 🚨 CORRECCIÓN DE RUTA: Cambiado de '../../models/User' a '../models/User'
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
        // En el registro, no enviamos la contraseña, ni el refreshToken
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

    if (!email || !password) {
        return res.status(400).json({ message: 'Login credentials required!' });
    }

    // Encuentra el usuario e incluye explícitamente el hash de la contraseña (select('+password'))
    const foundUser = await User.findOne({ email }).select('+password').exec();

    // Si el usuario no existe o las credenciales son inválidas
    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Comparación de contraseña ya se hizo arriba
    // const isMatch = await bcrypt.compare(password, foundUser.password); // Ya no es necesaria la línea de isMatch

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

    // Exclude sensitive fields from user data for client response
    const userData = await User.findById(foundUser._id).select('-password -refreshToken -email');

    // Set refresh token as a cookie
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', 
        // Usa secure: true si sameSite es 'None' (requerido para cross-site/producción)
        secure: process.env.NODE_ENV === 'production' || true, 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send access token and user data
    res.status(200).json({ accessToken, userData, message: 'Login successful' });
});

// ----------------------------------------------------------------------
// --- 3. Actualización de Detalles (updateUserDetails) ---
const updateUserDetails = asyncHandler(async (req, res) => {
    if (!req?.params?.id)
        return res.status(400).json({ message: 'User id required!' });

    // En la actualización, no necesitamos la contraseña, por lo que findOne() es suficiente.
    const foundUser = await User.findOne({ _id: req.params.id }).exec();
    if (!foundUser) {
        return res.status(404).json({ message: 'No user with that ID was found' }) 
    };
    const { name, email, password, bloodType, gender, phone, photo } = req.body;
    
    // 🎯 MEJORA: Evitar duplicidad de email si el email cambia
    if (email && email !== foundUser.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(409).json({ message: 'The new email address is already in use' });
        foundUser.email = email;
    }
    
    if (name) foundUser.name = name;
    if (password) foundUser.password = await bcrypt.hash(password, 10);
    if (bloodType) foundUser.bloodType = bloodType;
    if