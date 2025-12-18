const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

const appointmentBooking = asyncHandler(async (req, res) => {
    // 1. Extraer datos del body (enviados desde BookingPage)
    const { 
        doctorId, 
        userId: bodyUserId, // Agregado: Usa userId del body si enviado (frontend envía null para guests)
        fullName, 
        email, 
        phone, 
        appointmentDate, 
        appointmentTime, 
        reason 
    } = req.body;

    // 2. Validación robusta (completa todos los campos requeridos)
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !email || !phone || !reason) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios para procesar el servicio (verifica doctorId, date, time, fullName, email, phone, reason)." 
        });
    }

    // 3. Obtener userId: Prioriza token (si auth presente) o bodyUserId (null para guests)
    let userId = req.user?._id || bodyUserId || null; // Asume middleware setea req.user si token válido (cambia req.id a req.user si es estándar)
    // Nota: Si usas req.id, cambia a userId = req.id || bodyUserId || null;

    // 4. Buscar información del Doctor/Servicio
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El servicio solicitado no está disponible." });
    }

    // 5. Crear el registro con la nueva estructura (serviceName y userInfo)
    const newAppointment = await Appointment.create({
        user: userId, // Null para guests
        doctor: doctorId,
        serviceName: doctorData.name,         
        specialization: doctorData.specialization,
        userInfo: {                           
            fullName,
            email,
            phone
        },
        appointmentDetails: {
            date: new Date(appointmentDate), // Agregado: Convierte a Date para mejor manejo en DB
            time: appointmentTime,
            reason,
            status: "pending"
        },
        paymentInfo: {
            price: doctorData.ticketPrice || 0, // Default 0 si no existe
            currency: "COP",
            isPaid: false
        }
    });

    if (newAppointment) {
        // 6. Vincular la reserva al historial del Usuario SOLO si userId existe (no guests)
        if (userId) {
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                { $push: { appointments: newAppointment._id } },
                { new: true }
            );

            if (!updatedUser) {
                console.error(`❌ No se pudo vincular cita ${newAppointment._id} al user ${userId}`);
                return res.status(500).json({ message: "Reserva creada, pero no se vinculó al perfil del usuario." });
            }
        }

        console.log(`✅ Servicio reservado: ${newAppointment._id} para user: ${userId || 'Guest'}`);
        res.status(201).json({ 
            success: true,
            newAppointment, 
            message: "¡Servicio reservado y guardado exitosamente!" 
        });
    } else {
        res.status(500).json({ message: "Error interno al procesar la reserva del servicio." });
    }
});

module.exports = { appointmentBooking };