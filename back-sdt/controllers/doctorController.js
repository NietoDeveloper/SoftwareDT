const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const doctorRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, password and email are required!" });
    }
    const duplicate = await Doctor.findOne({ email });
    if (duplicate) {
        return res.status(409).json({ message: "Email already exists" }); 
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const result = await Doctor.create({
        name, 
        email,
        password: hashedpassword,
        roles: { doctor: 1001 } 
    });

    if (result) {
        res.status(201).json({ message: "Your doctor's profile was created successfully" });
    } else {
        res.status(500).json({ message: "Internal server error: Could not create profile." }); 
    }
});

const handleDoctorLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Login credentials required" });
    }

    const findDoctor = await Doctor.findOne({ email }).select('+password'); 
    if (!findDoctor) {
        return res.status(401).json({ message: "Unauthorized: Invalid credentials" }); 
    }

    const isMatch = await bcrypt.compare(password, findDoctor.password);
    
    if (isMatch) {
        const roles = findDoctor.roles ? Object.values(findDoctor.roles).filter(Boolean) : []; 
        
        const accessToken = jwt.sign(
            { id: findDoctor._id, roles: roles },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: findDoctor._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        const newRefreshTokenArray = findDoctor.refreshToken ? [...findDoctor.refreshToken, refreshToken] : [refreshToken];

        findDoctor.refreshToken = newRefreshTokenArray;
        await findDoctor.save();

        const { password: _, refreshToken: __, ...doctorData } = findDoctor.toObject();
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000 
        }); 
        
        res.json({ accessToken, roles, doctorData });
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid credentials" }); 
    }
});

const updateDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.params.id;
    
    if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required in params." });
    }
    
    const foundDoctor = await Doctor.findById(doctorId);
    if (!foundDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    
    const { email, phone, specialization, qualifications, experience, bio, timeSlots, name, ticketPrice, photo } = req.body;
    
    if (email && email !== foundDoctor.email) {
        const duplicateEmail = await Doctor.findOne({ email });
        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already in use by another account." });
        }
        foundDoctor.email = email;
    }
    


    const result = await foundDoctor.save();
    

   
});


    
    res.status(200).json({
        message: "Available doctors retrieved successfully",
        doctors
    });
});

const handleDoctorLogout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    
    if (!cookies?.jwt) {
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