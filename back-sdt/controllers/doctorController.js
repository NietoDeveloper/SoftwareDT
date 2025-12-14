const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');






module.exports = { 
    doctorRegister, 
    handleDoctorLogin, 
    getAllDoctors, 
    updateDoctor, 
    handleDoctorLogout 
};