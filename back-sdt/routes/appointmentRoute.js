const express = require('express');
const router = express.Router();
const { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
} = require('../controllers/appointmentController');

// Importamos tu middleware de autenticación (ajústalo según tu estructura de archivos)
// Esto es vital para que 'req.userId' exista y el panel funcione.
const { authenticate, restrict } = require('../auth/verifyToken'); 

/**
 * @route   POST /api/appointments
 * @desc    Crear una nueva cita
 * @access  Private/Public (Sugerido: authenticate para vincular al usuario)
 */
router.post('/', appointmentBooking); 

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Solo Admin)
 * @access  Private (Admin Only)
 */
router.get('/', authenticate, restrict(['admin']), getAppointments);

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico para el Panel
 * @access  Private (Dueño de la cuenta o Admin)
 */
router.get('/user/:userId', authenticate, getUserAppointments);

module.exports = router;