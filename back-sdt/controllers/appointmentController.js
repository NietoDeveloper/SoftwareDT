// IMPORTANTE: Subimos un nivel (..) para llegar a models
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); // Esto registra el esquema en la instancia de Mongoose
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    console.log("--- PROCESANDO RESERVA EN DATACENTER SDT ---", req.body);

    const { 
        doctorId, 
        userId: bodyUserId, 
        fullName, 
        email, 
        phone, 
        slotDate, // Cambiado para coincidir con el frontend
        slotTime, // Cambiado para coincidir con el frontend
        reason,
        serviceName,
        price 
    } = req.body;

    // Validación de campos con los nombres del frontend
    if (!doctorId || !slotDate || !slotTime || !fullName || !phone) {
        return res.status(400).json({ 
            success: false, 
            message: "Información incompleta: Revisa fecha, hora y datos de contacto." 
        });
    }

    const userId = req.userId || bodyUserId || null; 
    
    // Buscamos al especialista
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ success: false, message: "Especialista no encontrado en la DB." });
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
                date: slotDate, 
                time: slotTime,
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
            res.status(201).json({ 
                success: true, 
                message: "¡Cita sincronizada con éxito!",
                appointment: newAppointment 
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: `Error de Mongoose: ${error.message}` });
    }
});

// --- OBTENER CITAS DE UN USUARIO (Optimizado para Panel) ---
const getUserAppointments = asyncHandler(async (req, res) => {
    const userId = req.params.userId || req.userId;
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "ID de usuario requerido." });
    }

    // Usamos el modelo Doctor importado arriba para asegurar que el populate funcione
    const appointments = await Appointment.find({ user: userId })
        .populate({
            path: 'doctor',
            model: Doctor // Forzamos el uso del modelo registrado
        })
        .sort({ createdAt: -1 });

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
        doctorName: appt.doctor?.name || "Especialista SoftwareDT"
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