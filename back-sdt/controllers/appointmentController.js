const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    console.log("--- DATOS RECIBIDOS EN EL BACKEND ---", req.body);

    const { 
        doctorId, 
        userId: bodyUserId, 
        fullName, 
        email, 
        phone, 
        appointmentDate, 
        appointmentTime, 
        reason,
        serviceName,
        price 
    } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !phone) {
        return res.status(400).json({ message: "Información incompleta: Faltan campos obligatorios." });
    }

    const userId = req.userId || bodyUserId || null; 
    const doctorData = await Doctor.findById(doctorId).lean();

    if (!doctorData) {
        return res.status(404).json({ message: "Especialista no encontrado." });
    }

    try {
        const newAppointment = await Appointment.create({
            user: userId,
            doctor: doctorId,
            serviceName: serviceName || "Consultoría Técnica",         
            specialization: doctorData.specialization || "Software Development",
            userInfo: { 
                fullName: fullName, 
                email: email || "contacto@softwaredt.com",
                phone: phone 
            },
            appointmentDetails: {
                date: appointmentDate, // Guardamos como string o Date según tu esquema
                time: appointmentTime,
                reason: reason || "Sin motivo especificado",
                status: "pending"
            },
            paymentInfo: {
                price: price ? price.toString() : (doctorData.ticketPrice ? doctorData.ticketPrice.toString() : "0"),
                currency: "COP",
                isPaid: false
            }
        });

        if (newAppointment) {
            if (userId) {
                await User.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } });
            }
            res.status(201).json({ success: true, appointment: newAppointment });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// --- OBTENER CITAS DE UN USUARIO (Optimizado para el Panel) ---
const getUserAppointments = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
        return res.status(400).json({ message: "ID de usuario requerido" });
    }

    const appointments = await Appointment.find({ user: userId })
        .populate('doctor', 'name specialization')
        .sort({ createdAt: -1 });

    // MAPEAMOS LA DATA para que el Frontend la lea sin buscar dentro de objetos anidados
    const formattedAppointments = appointments.map(appt => ({
        _id: appt._id,
        serviceName: appt.serviceName,
        appointmentDate: appt.appointmentDetails.date,
        appointmentTime: appt.appointmentDetails.time,
        status: appt.appointmentDetails.status,
        reason: appt.appointmentDetails.reason,
        price: appt.paymentInfo.price,
        doctorId: appt.doctor
    }));

    res.status(200).json({ 
        success: true, 
        appointments: formattedAppointments 
    });
});

// --- OBTENER TODAS LAS CITAS (ADMIN) ---
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({})
        .populate('user', 'name email')
        .populate('doctor', 'name specialization')
        .sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
});

module.exports = { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
};