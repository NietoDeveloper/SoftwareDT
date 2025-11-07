const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// @desc Register a new doctor
// @route POST /api/v1/auth/register
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
        // HTTP 500 Internal Server Error (though asyncHandler often handles this)
        res.status(500).json({message: "Internal server error: Could not create profile."}); 
    }
});

// @desc Doctor login
// @route POST /api/v1/auth/login
// @access Public
const handleDoctorLogin = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    
    // 1. Validation check
    if(!email || !password) {
        return res.status(400).json({message: "Login credentials required"});
    }

    // 2. Find doctor and check password
    const findDoctor = await Doctor.findOne({email}).exec();
    if(!findDoctor) {
        // HTTP 401 Unauthorized for bad credentials
        return res.status(401).json({message: "Unauthorized: Invalid credentials"}); 
    }

    const isMatch = await bcrypt.compare(password, findDoctor.password);
    
    if(isMatch) {
        // 3. Generate tokens
        // Assuming roles is an array/object on the Doctor model
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
        
        // 4. Save refreshToken
        // Assuming the 'refreshToken' field on the Doctor model is *a string* for one token.
        // If it should handle multiple tokens (for multiple devices), the model should be an array.
        findDoctor.refreshToken = refreshToken; 
        await findDoctor.save();

        // 5. Build response and set cookie
        const doctorData = await Doctor.findById(findDoctor._id).select('-password -refreshToken -email');
        
        // Secure cookie settings (use secure: true in production with HTTPS)
        // Set sameSite to 'None' for cross-site cookie transmission (e.g., frontend on a different port/domain)
        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'None', 
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }); 
        
        res.json({accessToken, roles, doctorData});
    } else {
        // HTTP 401 Unauthorized for bad password
        res.status(401).json({message: "Unauthorized: Invalid credentials"}); 
    }
});

// @desc Update doctor profile information
// @route PUT /api/v1/doctors/:id
// @access Private (Requires authentication/authorization)
const updateDoctor = asyncHandler (async (req, res) => {
    const doctorId = req.params.id;
    if(!doctorId) {
        return res.status(400).json({message: "Doctor ID is required in params."});
    }
    
    // 1. Find doctor by ID
    const foundDoctor = await Doctor.findById(doctorId).exec();
    if(!foundDoctor) {
        // HTTP 404 Not Found (using 204 in your original was less appropriate for "not found")
        return res.status(404).json({message: "Doctor not found"});
    }
    
    // 2. Update fields if provided in request body
    const {email, phone, specialization, qualifications, experience, bio, timeSlots} = req.body;
    
    // Check for email duplicate *if* email is being updated and is different
    if (email && email !== foundDoctor.email) {
        const duplicateEmail = await Doctor.findOne({ email }).exec();
        if (duplicateEmail) {
            return res.status(409).json({ message: "Email already in use by another account." });
        }
        foundDoctor.email = email;
    }
    
    if (phone) foundDoctor.phone = phone;
    if (specialization) foundDoctor.specialization = specialization;
    if (qualifications) foundDoctor.qualifications = qualifications;
    if (bio) foundDoctor.bio = bio;
    if (experience) foundDoctor.experience = experience;
    if (timeSlots) foundDoctor.timeSlots = timeSlots;

    // 3. Save updates
    const result = await foundDoctor.save();
    
    if(result) {
        // Exclude sensitive fields from the returned data
        const updatedData = await Doctor.findById(result._id).select('-password -refreshToken -email');
        return res.status(200).json({
            message: "Doctor's info updated successfully!",
            doctorData: updatedData // Return updated data
        });
    } else {
        return res.status(500).json({message: "Could not update the details due to Internal server error!"});
    }
});

// @desc Get all doctors (excluding sensitive info)
// @route GET /api/v1/doctors
// @access Public (or adjust based on security model)
const getAllDoctors = asyncHandler ( async (req, res ) => {
    // Exclude password and tokens from results
    const doctors = await Doctor.find().select('-password -refreshToken'); 
    
    if(!doctors || doctors.length === 0) {
        return res.status(204).json({message: "No doctors found in the database!"}); // 204 No Content
    }
    
    res.json({doctors});
});

// @desc Doctor logout and clear cookie
// @route POST /api/v1/auth/logout
// @access Public
const handleDoctorLogout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    
    // 1. Check for cookie
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content to send back, successful "logout" if no cookie
    } 
    
    const refreshToken = cookies.jwt;

    // 2. Find doctor by refreshToken
    const foundDoctor = await Doctor.findOne({ refreshToken }).exec();
    
    // 3. Clear cookie regardless if token is in DB
    res.clearCookie('jwt', { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Must match the settings used to set the cookie
        sameSite: 'None' 
    });

    if (!foundDoctor) {
        // Token was invalid or already removed from DB, but the cookie is cleared.
        return res.sendStatus(204); 
    }

    // 4. Remove refreshToken from the database
    // Assuming refreshToken field is a STRING (single token) on the Doctor model
    foundDoctor.refreshToken = ''; 
    await foundDoctor.save();

    // 5. Successful logout
    res.sendStatus(204); // Successful request, no content to return
});

module.exports = { 
    doctorRegister, 
    handleDoctorLogin, 
    getAllDoctors, 
    updateDoctor, 
    handleDoctorLogout 
};