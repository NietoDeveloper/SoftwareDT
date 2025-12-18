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
            message: "Faltan campos obligatorios para procesar la reserva." 
        });
    }

    // 3. Prioridad al ID del Token (Security First)
    // Si el middleware optionalAccess encontró un token válido, usamos ese ID.
    // Si no, verificamos si viene un ID en el body (para flujos manuales).
    const userId = req.userId || bodyUserId || null; 

    // 4. Buscar información del Doctor/Servicio
    const doctorData = await Doctor.findById(doctorId).lean();
    if (!doctorData) {
        return res.status(404).json({ message: "El especialista o servicio solicitado no existe." });
    }

    // 5. Crear el registro en la base de datos de CITAS (citaDB)
    const newAppointment = await Appointment.create({
        user: userId, // null si es Guest
        doctor: doctorId,
        serviceName: doctorData.name,         
        specialization: doctorData.specialization,
        userInfo: {                                     
            fullName,
            email,
            phone
        },
        appointmentDetails: {
            // Aseguramos que la fecha sea válida antes de guardarla
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
        // 6. Vinculación atómica si hay un usuario logueado
        if (userId) {
            try {
                // Buscamos y actualizamos el usuario en userDB
                const updatedUser = await User.findByIdAndUpdate(
                    userId, 
                    { $push: { appointments: newAppointment._id } },
                    { new: true, runValidators: false } // runValidators false para evitar líos con contraseñas al actualizar solo array
                );

                if (!updatedUser) {
                    console.warn(`⚠️ Cita ${newAppointment._id} creada pero el usuario ${userId} no existe en la DB de usuarios.`);
                }
            } catch (error) {
                console.error(`❌ Error vinculando cita al usuario: ${error.message}`);
                // No lanzamos error aquí para no cancelar la creación de la cita, 
                // pero podrías manejarlo según tu lógica de negocio.
            }
        }

        console.log(`✅ Registro exitoso: ${newAppointment._id} [${userId ? 'Usuario' : 'Invitado'}]`);
        
        return res.status(201).json({ 
            success: true,
            appointmentId: newAppointment._id, 
            message: "¡Reserva confirmada! Pronto nos pondremos en contacto." 
        });
    } else {
        res.status(400);
        throw new Error("No se pudo completar el registro de la cita.");
    }
});

module.exports = { appointmentBooking };