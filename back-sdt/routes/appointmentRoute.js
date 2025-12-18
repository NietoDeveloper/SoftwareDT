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
 * @desc    Crear una cita. Si viene con token (optionalAccess), se liga al userId. 
 * Si no, se procesa como Guest.
 * @access  Public / Optional Auth
 */
router.post(
    '/', 
    asyncHandler(async (req, res) => {
        // Validación rápida antes de ir al controller
        const { doctorId, date, time } = req.body;
        
        if (!doctorId || !date || !time) {
            return res.status(400).json({ message: 'Doctor ID, fecha y hora son requeridos.' });
        }

        // Llamamos a la función del controlador
        await appointmentBooking(req, res);
    })
);

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Admin)
 */
router.get('/', asyncHandler(getAppointments));

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas específicas de un usuario
 */
router.get('/user/:userId', asyncHandler(getUserAppointments));

module.exports = router;