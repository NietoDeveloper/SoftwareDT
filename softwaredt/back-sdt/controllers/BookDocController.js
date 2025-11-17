const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor')


const getDoctorProfile = asyncHandler(async (req, res) => {
    const doctorId = req.params.id;
    console.log("Requested doctorId:", doctorId); 
    
    if (!doctorId) return res.status(400).json({ message: "ID required" });

    const foundDoctor = await Doctor.findById(doctorId).select('-password -refreshToken -email').exec();
    console.log("Found Doctor:", foundDoctor); 
    
    if (!foundDoctor) {
        return res.status(404).json({ message: "Doctor not found!" });
    } else {
        res.status(200).json(foundDoctor);
    }
});

module.exports = {
    getDoctorProfile
}