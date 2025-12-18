const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
} = require('../controllers/appointmentController');

/**
 * @route   POST /api/appointments
 * @desc    Crear una nueva cita (Guest o Logueado)
 * @access  Public/Optional (vía optionalAccess en server.js)
 */
router.post(
    '/', 
    asyncHandler(async (req, res, next) => {
        // 1. Validación rápida de campos obligatorios en la capa de ruta
        const { doctorId, appointmentDate, appointmentTime, fullName, email, phone, reason } = req.body;
        
        if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !email || !phone || !reason) {
            return res.status(400).json({ 
                message: 'Información incompleta. Por favor verifique todos los campos.' 
            });
        }

        // 2. Ejecutar el controlador directamente
        // Pasamos el flujo al controlador que ya importamos
        return appointmentBooking(req, res, next);
    })
);

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Admin)
 */
router.get('/', asyncHandler(getAppointments));

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico
 */
router.get('/user/:userId', asyncHandler(getUserAppointments));

// CRÍTICO: Asegurar la exportación del router
module.exports = router;