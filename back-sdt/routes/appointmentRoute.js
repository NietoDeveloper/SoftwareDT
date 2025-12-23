const express = require('express');
const router = express.Router();
const { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
} = require('../controllers/appointmentController');

/**
 * @route   POST /api/appointments
 * @desc    Crear una nueva cita
 * @access  Public/Optional
 */
router.post('/', (req, res, next) => {
    // 1. Simplificamos la validación en ruta. 
    // Solo validamos lo extremadamente crítico. 
    // El resto lo maneja el controlador con valores por defecto.
    const { doctorId, appointmentDate, appointmentTime, fullName, phone } = req.body;
    
    if (!doctorId || !appointmentDate || !appointmentTime || !fullName || !phone) {
        return res.status(400).json({ 
            message: 'Datos básicos incompletos (Especialista, Fecha, Hora, Nombre o Teléfono).' 
        });
    }

    // 2. Pasamos directamente al controlador.
    // Quitamos el asyncHandler extra de aquí porque el controlador ya lo tiene.
    return appointmentBooking(req, res, next);
});

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Admin)
 */
router.get('/', getAppointments);

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico
 */
router.get('/user/:userId', getUserAppointments);

module.exports = router;