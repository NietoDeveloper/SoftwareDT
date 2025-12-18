const Appointment = require('../models/Appointment');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const appointmentBooking = asyncHandler(async (req, res) => {
    const doctor = req?.params?.id;
    const { appointmentDate } = req.body;

    if (!doctor || !appointmentDate) {
        return res.status(400).json({ message: "Doctor and appointment date are required!" });
    }

    const userId = req.userId;

    try {
        const newAppointment = await Appointment.create({
            user: userId,
            doctor,
            appointmentDate,
        });

        if(newAppointment) {



        
});

module.exports = { appointmentBooking };


