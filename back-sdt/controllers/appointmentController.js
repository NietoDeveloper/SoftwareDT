// back-sdt/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const asyncHandler = require('express-async-handler');

        return res.status(400).json({ success: false, message: "Identificador de usuario no detectado." });

        .sort({ 'appointmentDetails.date': -1, 'appointmentDetails.time': -1 });

    // Mapeo preciso para que el Frontend no tenga que procesar lógica extra
    const formattedAppointments = appointments.map(appt => ({
        _id: appt._id,
        serviceName: appt.serviceName,
        specialization: appt.specialization,
        appointmentDate: appt.appointmentDetails?.date,
        appointmentTime: appt.appointmentDetails?.time,
        status: appt.appointmentDetails?.status || 'pending',
        reason: appt.appointmentDetails?.reason,
        price: appt.paymentInfo?.price,
        isPaid: appt.paymentInfo?.isPaid,
        doctorName: appt.doctor?.name || "Especialista SoftwareDT",
        doctorImage: appt.doctor?.image || ""
    }));

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