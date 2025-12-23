// IMPORTANTE: Subimos un nivel (..) para llegar a models y config
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    // Depuración en el Datacenter Software DT
    console.log("--- PROCESANDO RESERVA EN BACKEND ---", req.body);

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

    // Validación de campos requeridos
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !phone) {
        return res.status(400).json({ success: false, message: "Información incompleta: Faltan campos obligatorios." });
    }

    // El userId puede venir del middleware verifyAccess (req.userId) o del body
    const userId = req.userId || bodyUserId || null; 
    
    // Buscamos al especialista para denormalizar sus datos básicos
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ success: false, message: "Especialista no encontrado." });
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
                date: appointmentDate, 
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
            // Si el usuario está registrado, vinculamos la cita a su perfil en userDB
            if (userId) {
                await User.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } });
            }
            res.status(201).json({ 
                success: true, 
                message: "¡Cita agendada con éxito!",
                appointment: newAppointment 
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Error en Mongoose: ${error.message}` });
    }
});

// --- OBTENER CITAS DE UN USUARIO (Optimizado para Panel) ---
const getUserAppointments = asyncHandler(async (req, res) => {
    const userId = req.params.userId || req.userId;
    
    if (!userId) {
        return res.status(400).json({ message: "ID de usuario requerido para el Dashboard" });
    }

    const appointments = await Appointment.find({ user: userId })
        .populate('doctor', 'name specialization')
        .sort({ createdAt: -1 });

    // Aplanamos la estructura para que el Frontend la use directamente (appt.status, appt.price)
    const formattedAppointments = appointments.map(appt => ({
        _id: appt._id,
        serviceName: appt.serviceName,
        specialization: appt.specialization,
        appointmentDate: appt.appointmentDetails.date,
        appointmentTime: appt.appointmentDetails.time,
        status: appt.appointmentDetails.status,
        reason: appt.appointmentDetails.reason,
        price: appt.paymentInfo.price,
        isPaid: appt.paymentInfo.isPaid,
        doctorName: appt.doctor?.name || "Especialista SDT"
    }));

    res.status(200).json({ 
        success: true, 
        count: formattedAppointments.length,
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