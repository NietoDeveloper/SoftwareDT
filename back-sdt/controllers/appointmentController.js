const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    // Extraemos serviceName y price que vienen del frontend (Services.jsx flow)
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

    // Validación: Agregamos flexibilidad por si serviceName viene del body
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !phone || !reason) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios (Fecha, Hora, Teléfono o Motivo) para procesar la reserva." 
        });
    }

    const userId = req.userId || bodyUserId || null; 

    // Buscamos al doctor para tener la referencia, pero priorizamos la info del flujo de servicios
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El especialista solicitado no existe en nuestra base de datos." });
    }

    // CREACIÓN DE LA CITA
    const newAppointment = await Appointment.create({
        user: userId,
        doctor: doctorId,
        // Si viene serviceName del front lo usamos, si no, usamos el nombre del doctor
        serviceName: serviceName || doctorData.name,         
        specialization: doctorData.specialization || "Consultoría Técnica",
        userInfo: { fullName, email, phone },
        appointmentDetails: {
            date: new Date(appointmentDate), 
            time: appointmentTime,
            reason: reason,
            status: "pending"
        },
        paymentInfo: {
            // Si viene el precio formateado del front lo usamos, sino el del doctor
            price: price || doctorData.ticketPrice || 0,
            currency: "COP",
            isPaid: false
        }
    });

    if (newAppointment) {
        if (userId) {
            try {
                // Actualizamos el array de citas del usuario
                await User.findByIdAndUpdate(
                    userId, 
                    { $push: { appointments: newAppointment._id } },
                    { new: true, runValidators: false }
                );
            } catch (error) {
                console.error(`❌ Error vinculando cita al usuario: ${error.message}`);
            }
        }
        
        return res.status(201).json({ 
            success: true,
            appointment: newAppointment, // Enviamos el objeto completo para la confirmación
            message: "¡Reserva confirmada exitosamente!" 
        });
    } else {
        return res.status(400).json({ message: "No se pudo crear el registro de la cita." });
    }
});

// --- OBTENER TODAS LAS CITAS (ADMIN) ---
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({})
        .populate('user', 'name email')
        .populate('doctor', 'name specialization')
        .sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
});

// --- OBTENER CITAS DE UN USUARIO ---
const getUserAppointments = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
        return res.status(400).json({ message: "ID de usuario requerido" });
    }

    const appointments = await Appointment.find({ user: userId })
        .populate('doctor', 'name specialization')
        .sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
});

module.exports = { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
};