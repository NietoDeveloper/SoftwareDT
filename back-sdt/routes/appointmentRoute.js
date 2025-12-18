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
        // 1. Validación rápida de campos obligatorios
        const { doctorId, appointmentDate, appointmentTime } = req.body;
        
        if (!doctorId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ 
                message: 'Faltan datos críticos: doctorId, appointmentDate o appointmentTime.' 
            });
        }

        // 2. Ejecutar el controlador
        // Nota: Solo llamamos a next si el controlador no envía una respuesta, 
        // pero appointmentBooking debería encargarse de res.json()
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

module.exports = router;