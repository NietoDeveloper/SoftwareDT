// back-sdt/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const asyncHandler = require('express-async-handler');

// --- CREAR CITA (RESERVA SDT) ---
const appointmentBooking = asyncHandler(async (req, res) => {
    const { 
        doctorId, 
        userId: bodyUserId, 
        fullName, 
        email, 
        phone, 
        slotDate, 
        slotTime, 
        reason,
        serviceName,
        price 
    } = req.body;

    // Validación estricta para evitar datos corruptos en el Datacenter
    if (!doctorId || !slotDate || !slotTime || !fullName || !phone) {
        return res.status(400).json({ 
            success: false, 
            message: "Información incompleta: Revisa fecha, hora y datos de contacto." 
        });
    }

    // El userId puede venir del middleware de auth (req.userId) o del cuerpo del request
    const userId = req.userId || bodyUserId || null; 
    
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
                fullName, 
                email: email || "contacto@softwaredt.com",
                phone 
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
            // Sincronización bidireccional: actualizamos el array de citas del usuario
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
        res.status(400).json({ success: false, message: `Error SDT-Datacenter: ${error.message}` });
    }
});

// --- OBTENER CITAS DE UN USUARIO (OPTIMIZADO PARA PANEL) ---
const getUserAppointments = asyncHandler(async (req, res) => {
    // Tomamos el ID de la URL o del token verificado
    const userId = req.params.userId || req.userId;
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "Identificador de usuario no detectado." });
    }

    // Buscamos citas vinculadas al clúster del usuario
    const appointments = await Appointment.find({ user: userId })
        .populate({
            path: 'doctor',
            model: Doctor,
            select: 'name specialization image'
        })
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