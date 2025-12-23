const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    const { 
        doctorId, 
        userId: bodyUserId, 
        fullName, 
        email, 
        phone, 
        appointmentDate, 
        appointmentTime, 
        reason 
    } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !email || !phone || !reason) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios para procesar la reserva." 
        });
    }

    const userId = req.userId || bodyUserId || null; 

    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El especialista o servicio solicitado no existe." });
    }

    const newAppointment = await Appointment.create({
        user: userId,
        doctor: doctorId,
        serviceName: doctorData.name,         
        specialization: doctorData.specialization,
        userInfo: { fullName, email, phone },
        appointmentDetails: {
            date: new Date(appointmentDate), 
            time: appointmentTime,
            reason,
            status: "pending"
        },
        paymentInfo: {
            price: doctorData.ticketPrice || 0,
            currency: "COP",
            isPaid: false
        }
    });

    if (newAppointment) {
        if (userId) {
            try {
                await User.findByIdAndUpdate(
                    userId, 
                    { $push: { appointments: newAppointment._id } },
                    { new: true, runValidators: false }
                );
            } catch (error) {
                console.error(`❌ Error vinculando cita: ${error.message}`);
            }
        }
        return res.status(201).json({ 
            success: true,
            appointmentId: newAppointment._id, 
            message: "¡Reserva confirmada!" 
        });
    } else {
        res.status(400);
        throw new Error("Error al registrar la cita.");
    }
});

// --- OBTENER TODAS LAS CITAS (ADMIN) ---
const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
});

// --- OBTENER CITAS DE UN USUARIO ---
const getUserAppointments = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
        return res.status(400).json({ message: "ID de usuario requerido" });
    }

    const appointments = await Appointment.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
});

// CRÍTICO: Exportar las TRES funciones para que coincidan con el archivo de rutas
module.exports = { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
};