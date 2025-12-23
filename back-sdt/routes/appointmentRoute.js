const express = require('express');
const router = express.Router();

// IMPORTANTE: Forzamos la carga de modelos antes que el controlador
// Esto soluciona el error "Schema hasn't been registered for model Doctor"
require('../models/Doctor');
require('../models/User');

const { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
} = require('../controllers/appointmentController');

// Middleware de acceso
const verifyAccess = require('../middleware/verifyAccess'); 

/**
 * @route   POST /api/appointments
 * @desc    Crear una nueva cita vinculada al usuario logueado
 */
router.post('/', verifyAccess, appointmentBooking); 

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico para el Panel de Software DT
 */
router.get('/user/:userId', verifyAccess, getUserAppointments);

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Solo para gestión administrativa)
 */
router.get('/', verifyAccess, getAppointments);

module.exports = router;