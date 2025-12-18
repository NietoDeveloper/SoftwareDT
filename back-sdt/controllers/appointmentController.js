const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); 
const asyncHandler = require('express-async-handler');

const appointmentBooking = asyncHandler(async (req, res) => {
    // 1. Extraer datos del body (enviados desde BookingPage)
    const { 
        doctorId, 
        fullName, 
        email, 
        phone, 
        appointmentDate, 
        appointmentTime, 
        reason 
    } = req.body;

    // 2. Validación robusta
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName) {
        return res.status(400).json({ 
            message: "Faltan campos obligatorios para procesar el servicio." 
        });
    }

    // 3. Obtener ID del usuario desde el token (inyectado por su middleware de acceso)
    const userId = req.id; 

    // 4. Buscar información del Servicio para la "Tarjeta"
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El servicio solicitado no está disponible." });
    }

    // 5. Crear el registro con la nueva estructura (serviceName y userInfo)
    const newAppointment = await Appointment.create({
        user: userId,
        doctor: doctorId,
        serviceName: doctorData.name,         // Coincide con el modelo ajustado
        specialization: doctorData.specialization,
        userInfo: {                           // Coincide con el modelo ajustado
            fullName,
            email,
            phone
        },
        appointmentDetails: {
            date: appointmentDate,
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
        // 6. Vincular la reserva al historial del Usuario
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $push: { appointments: newAppointment._id } },
            { new: true }
        );

        if (updatedUser) {
            console.log(`✅ Servicio reservado: ${newAppointment._id}`);
            res.status(201).json({ 
                success: true,
                newAppointment, 
                message: "¡Servicio reservado y guardado exitosamente!" 
            });
        } else {
            res.status(500).json({ message: "Reserva creada, pero no se vinculó al perfil del usuario." });
        }
    } else {
        res.status(500).json({ message: "Error interno al procesar la reserva del servicio." });
    }
});

module.exports = { appointmentBooking };