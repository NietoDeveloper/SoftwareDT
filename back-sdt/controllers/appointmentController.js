const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

const appointmentBooking = asyncHandler(async (req, res) => {
    // 1. Extraer datos del body
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

    // 2. Validación robusta
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !email || !phone || !reason) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios (doctorId, date, time, fullName, email, phone, reason)." 
        });
    }

    // 3. Obtener userId con consistencia
    // Según nuestro middleware optionalAccess, el ID viene en req.userId
    const userId = req.userId || bodyUserId || null; 

    // 4. Buscar información del Doctor/Servicio
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El servicio solicitado no está disponible." });
    }

    // 5. Crear el registro en la base de datos de CITAS
    const newAppointment = await Appointment.create({
        user: userId, // Será null si es Guest
        doctor: doctorId,
        serviceName: doctorData.name,         
        specialization: doctorData.specialization,
        userInfo: {                                  
            fullName,
            email,
            phone
        },
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
        // 6. Vincular la reserva al Usuario SOLO si userId existe
        if (userId) {
            // Importante: User.findByIdAndUpdate debe apuntar a la conexión userDB 
            // Asegúrate que tu modelo User esté exportado usando esa conexión
            const updatedUser = await User.findByIdAndUpdate(
                userId, 
                { $push: { appointments: newAppointment._id } },
                { new: true }
            );

            if (!updatedUser) {
                console.warn(`⚠️ Cita ${newAppointment._id} creada pero no se encontró usuario ${userId} para vincular.`);
            }
        }

        console.log(`✅ Cita OK: ${newAppointment._id} | Tipo: ${userId ? 'Usuario' : 'Guest'}`);
        
        return res.status(201).json({ 
            success: true,
            appointmentId: newAppointment._id, 
            message: "¡Servicio reservado exitosamente!" 
        });
    } else {
        res.status(500);
        throw new Error("Error interno al procesar la reserva.");
    }
});

module.exports = { appointmentBooking };