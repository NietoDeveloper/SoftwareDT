const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor'); // Importante para traer info de la tarjeta
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
            message: "Faltan campos obligatorios (Doctor, fecha, hora o nombre)." 
        });
    }

    // 3. Obtener ID del usuario desde el token (inyectado por verifyAccess)
    const userId = req.id; 

    // 4. Buscar información del doctor para la "Tarjeta" en la DB de Atlas
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El especialista no existe." });
    }

    // 5. Crear la cita con la estructura JSON completa para Atlas
    const newAppointment = await Appointment.create({
        user: userId,
        doctor: doctorId,
        doctorName: doctorData.name,         // Info de la tarjeta
        specialization: doctorData.specialization, // Info de la tarjeta
        patientInfo: {
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
            price: doctorData.ticketPrice || 0
        }
    });

    if (newAppointment) {
        // 6. Vincular la cita al historial del usuario
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $push: { appointments: newAppointment._id } },
            { new: true }
        );

        if (updatedUser) {
            console.log(`✅ Cita creada: ${newAppointment._id} para el usuario: ${userId}`);
            res.status(201).json({ 
                success: true,
                newAppointment, 
                message: "¡Cita reservada y guardada en Atlas exitosamente!" 
            });
        } else {
            res.status(500).json({ message: "Cita creada, pero no se pudo actualizar el perfil del usuario." });
        }
    } else {
        res.status(500).json({ message: "Error interno al intentar crear la cita." });
    }
});

module.exports = { appointmentBooking };