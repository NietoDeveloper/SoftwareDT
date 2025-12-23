const express = require('express');
const router = express.Router();

// Registro preventivo de modelos para evitar errores de compilación en Mongoose
require('../models/Doctor');
require('../models/User');

const { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments 
} = require('../controllers/appointmentController');

// Middleware de autenticación y acceso
const verifyAccess = require('../middleware/verifyAccess'); 

/**
 * @route   POST /api/appointments
 * @desc    Crear una nueva cita vinculada al usuario logueado (Datacenter SDT)
 */
router.post('/', verifyAccess, appointmentBooking); 

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Listar citas de un usuario específico. 
 * Se añade validación de seguridad para que el usuario solo vea sus datos.
 */
router.get('/user/:userId', verifyAccess, (req, res, next) => {
    // Seguridad Nivel Senior: Si el ID del token no coincide con el de la URL 
    // y no es un admin, bloqueamos el acceso.
    if (req.userId !== req.params.userId && !req.isAdmin) {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso denegado: No puedes consultar citas de otros usuarios." 
        });
    }
    next();
}, getUserAppointments);

/**
 * @route   GET /api/appointments
 * @desc    Listar todas las citas (Solo para gestión administrativa / SoftwareDT Admin)
 */
router.get('/', verifyAccess, (req, res, next) => {
    // Solo permitimos continuar si el middleware marcó al usuario como Admin
    if (!req.isAdmin) {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso restringido a administradores." 
        });
    }
    next();
}, getAppointments);

module.exports = router;