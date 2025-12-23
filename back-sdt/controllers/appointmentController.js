const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

// --- CREAR CITA ---
const appointmentBooking = asyncHandler(async (req, res) => {
    // Depuración: Ver exactamente qué llega del frontend
    console.log("--- DATOS RECIBIDOS EN EL BACKEND ---");
    console.log(req.body);

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

    // Validación estricta antes de tocar la DB
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !phone) {
        return res.status(400).json({ 
            message: "Información incompleta: Faltan campos obligatorios." 
        });
    }

    const userId = req.userId || bodyUserId || null; 

    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "Especialista no encontrado." });
    }

    // CREACIÓN DE LA CITA
    try {
        const newAppointment = await Appointment.create({
            user: userId,
            doctor: doctorId,
            serviceName: serviceName || doctorData.name,         
            specialization: doctorData.specialization || "Consultoría Técnica",
            userInfo: { 
                fullName: fullName, 
                email: email || (req.user ? req.user.email : "contacto@softwaredt.com"), // EVITA EL ERROR 400
                phone: phone 
            },
            appointmentDetails: {
                date: new Date(appointmentDate), 
                time: appointmentTime,
                reason: reason || "Sin motivo especificado",
                status: "pending"
            },
            paymentInfo: {
                // Convertimos a String para que coincida con el nuevo modelo ajustado
                price: price ? price.toString() : (doctorData.ticketPrice ? doctorData.ticketPrice.toString() : "0"),
                currency: "COP",
                isPaid: false
            }
        });

        if (newAppointment) {
            if (userId) {
                await User.findByIdAndUpdate(
                    userId, 
                    { $push: { appointments: newAppointment._id } }
                );
            }
            
            console.log("✅ Cita creada con éxito:", newAppointment._id);
            return res.status(201).json({ 
                success: true,
                appointment: newAppointment,
                message: "¡Reserva confirmada exitosamente!" 
            });
        }
    } catch (error) {
        console.error("❌ ERROR MONGOOSE:", error.message);
        return res.status(400).json({ 
            success: false, 
            message: `Error de validación: ${error.message}` 
        });
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