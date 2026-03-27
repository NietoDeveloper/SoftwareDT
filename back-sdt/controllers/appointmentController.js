// back-sdt/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const asyncHandler = require('express-async-handler');

        return res.status(400).json({ success: false, message: "Identificador de usuario no detectado." });

        .sort({ 'appointmentDetails.date': -1, 'appointmentDetails.time': -1 });

    res.status(200).json({ 
        success: true, 
        count: formattedAppointments.length,
        appointments: formattedAppointments 
    });
});

// --- OBTENER TODAS LAS CITAS (ADMIN / MONITORING) ---
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({})
        .populate({ path: 'user', model: User, select: 'name email' })
        .populate({ path: 'doctor', model: Doctor, select: 'name specialization' })
        .sort({ createdAt: -1 });
        
    res.status(200).json({ success: true, appointments });
});

module.exports = { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
};