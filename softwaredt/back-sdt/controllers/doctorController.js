const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// @desc Doctor registration
// @route POST /api/doctor/register
// @access Public
const doctorRegister = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body;
    
    // 1. Validation check
    if(!name || !email || !password) {
        return res.status(400).json({message: "Name, password and email are required!"});
    }

    // 2. Check for duplicates
    const duplicate = await Doctor.findOne({email}).exec();
    if(duplicate) {
        // HTTP 409 Conflict
        return res.status(409).json({message: "Email already exists"}); 
    }

    // 3. Hash password and create user
    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await Doctor.create({
        name, 
        email,
        password: hashedpassword
    });

    if(result) {
        // HTTP 201 Created
        res.status(201).json({message: "Your doctor's profile was created successfully"});
    } else {
        res.status(500).json({message: "Internal server error: Could not create profile."}); 
    }
});

// @desc Doctor login
// @route POST /api/doctor/login
// @access Public
const handleDoctorLogin = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    
    // 1. Validation check
    if(!email || !password) {
        return res.status(400).json({message: "Login credentials required"});
    }

    // 2. Find doctor and check password
    // 🔑 CORRECCIÓN CRÍTICA: Debemos seleccionar (+password) para obtener el hash
    const findDoctor = await Doctor.findOne({email}).select('+password').exec(); 
    if(!findDoctor) {
        return res.status(401).json({message: "Unauthorized: Invalid credentials"}); 
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, findDoctor.password);
    
    if(isMatch) {
        // 4. Generate tokens and roles
        const roles = findDoctor.roles ? Object.values(findDoctor.roles).filter(Boolean) : []; 
        
        const accessToken = jwt.sign (
            {id: findDoctor._id, roles: roles},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        );

        const refreshToken = jwt.sign(
            {id: findDoctor._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        
        // 5. Save refreshToken (as an array element)
        // 🔑 CORRECCIÓN: Manejar refreshToken como un array (para múltiples dispositivos)
        const newRefreshTokenArray = findDoctor.refreshToken ? [...findDoctor.refreshToken, refreshToken] : [refreshToken];

        findDoctor.refreshToken = newRefreshTokenArray;
        await findDoctor.save();

        // 6. Build response and set cookie
        // Excluir la contraseña y el refresh token del objeto que se envía al cliente
        const { password: _, refreshToken: __, ...doctorData } = findDoctor.toObject();
        
        // Secure cookie settings
        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Use secure: true in production
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }); 
        
        res.json({accessToken, roles, doctorData});
    } else {
        res.status(401).json({message: "Unauthorized: Invalid credentials"}); 
    }
});

// @desc Update doctor profile information
// @route PUT /api/doctor/update/:id
// @access Private (Requires authentication/authorization)
const updateDoctor = asyncHandler (async (req, res) => {
    const doctorId = req.params.id;
    
    if(!doctorId) {
        return res.status(400).json({message: "Doctor ID is required in params."});
    }
    
    // 1. Find doctor by ID
    const foundDoctor = await Doctor.findById(doctorId).exec();
    if(!foundDoctor) {
        return res.status(404).json({message: "Doctor not found"});
    }
    
    // 2. Update fields if provided in request body
    const {email, phone, specialization, qualifications, experience, bio, timeSlots, name, ticketPrice} = req.body;
    
    // Check for email duplicate *if* email is being updated and is different
    if (email && email !== foundDoctor.email) {
        const duplicateEmail = await Doctor.findOne({ email }).exec();
        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already in use by another account." });
        }
        foundDoctor.email = email;
    }
    
    // Actualizar campos básicos
    if (name) foundDoctor.name = name;
    if (ticketPrice) foundDoctor.ticketPrice = ticketPrice;
    
    // Actualizar campos de perfil
    if (phone) foundDoctor.phone = phone;
    if (specialization) foundDoctor.specialization = specialization;
    if (qualifications) foundDoctor.qualifications = qualifications;
    if (bio) foundDoctor.bio = bio;
    if (experience) foundDoctor.experience = experience;
    if (timeSlots) foundDoctor.timeSlots = timeSlots;

    const result = await foundDoctor.save();
    
    if(result) {
        const { password: _, refreshToken: __, ...updatedData } = result.toObject();
        
        return res.status(200).json({
            message: "Doctor's info updated successfully!",
            doctorData: updatedData
        });
    } else {
        return res.status(500).json({message: "Could not update the details due to Internal server error!"});
    }
});

const getAllDoctors = asyncHandler ( async (req, res ) => {
    const doctors = await Doctor.find().select('-password -refreshToken').exec(); 
    
    if(!doctors || doctors.length === 0) {
        return res.status(200).json({
            message: "No doctors found in the database!",
            doctors: []
        }); 
    }
    
    res.status(200).json({
        message: "Doctors retrieved successfully",
        doctors
    });
});

const handleDoctorLogout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    
    // 1. Check for cookie
    if (!cookies?.jwt) {
        return res.sendStatus(204); 
    } 
    
    const refreshToken = cookies.jwt;
    const foundDoctor = await Doctor.findOne({ refreshToken }).select('+refreshToken').exec();

    res.clearCookie('jwt', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'None' 
    });

    if (!foundDoctor) {
        return res.sendStatus(204); 
    }

    const newRefreshTokenArray = foundDoctor.refreshToken.filter(token => token !== refreshToken);

    foundDoctor.refreshToken = newRefreshTokenArray; 
    await foundDoctor.save();

    res.sendStatus(204); 
});

module.exports = { 
    doctorRegister, 
    handleDoctorLogin, 
    getAllDoctors, 
    updateDoctor, 
    handleDoctorLogout 
};