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
 */
router.post(
    '/', 
    asyncHandler(async (req, res, next) => {
        // 1. Validación rápida de campos obligatorios del body
        // Nota: Asegúrate que el frontend envíe 'appointmentDate' y 'appointmentTime' 
        // para que coincida con la lógica de tu controlador.
        const { doctorId, appointmentDate, appointmentTime } = req.body;
        
        if (!doctorId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ 
                message: 'Faltan datos críticos: doctorId, appointmentDate o appointmentTime.' 
            });
        }

        // 2. Ejecutar el controlador
        // Pasamos req, res y next explícitamente para asegurar el flujo
        await appointmentBooking(req, res, next);
    })
);

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Solo para vista administrativa)
 */
router.get('/', asyncHandler(getAppointments));

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico
 */
router.get('/user/:userId', asyncHandler(getUserAppointments));

module.exports = router;