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





module.exports = { 
    doctorRegister, 
    handleDoctorLogin, 
    getAllDoctors, 
    updateDoctor, 
    handleDoctorLogout 
};