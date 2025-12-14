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



module.exports = { 
    doctorRegister, 
    handleDoctorLogin, 
    getAllDoctors, 
    updateDoctor, 
    handleDoctorLogout 
};