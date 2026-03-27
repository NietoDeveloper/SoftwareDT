import express from 'express';
const router = express.Router();

/**
 * 🛰️ SOFTWARE DT - APPOINTMENT ROUTER (Nivel S+)
 * Gestión centralizada de citas y auditoría de clúster.
 */
import { 
    appointmentBooking, 
    getAppointments, 
    getUserAppointments,
    updateAppointmentStatus 
} from '../controllers/appointmentController.js';

// Importamos el acceso por defecto y el verificador de roles nombrado
import verifyAccess, { verifyRoles, ROLES_LIST } from '../middleware/verifyAccess.js'; 

/**
 * @route   POST /api/appointments
 * @desc    Sincronización: BookingPage.jsx -> Datacenter Citas
 */
router.post('/', verifyAccess, appointmentBooking); 

/**
 * @route   GET /api/appointments/user/:userId
 * @desc    Filtro de Privacidad: Solo el propietario o Staff/Admin
 */
router.get('/user/:userId', verifyAccess, (req, res, next) => {
    const isOwner = req.userId === req.params.userId;
    const isStaff = req.roles?.some(role => [ROLES_LIST.Admin, ROLES_LIST.Employee].includes(role));

    if (!isOwner && !isStaff) {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso denegado: Nodo no autorizado para este clúster de datos." 
        });
    }
    next();
}, getUserAppointments);

/**
 * @route   GET /api/appointments
 * @desc    Centro de Control Global (Datacenter Admin)
 */
router.get('/', verifyAccess, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee), getAppointments);

/**
 * @route   PATCH /api/appointments/:id/status
 * @desc    Ajustar Citas Cumplidas (Paso 2 MVP)
 */
router.patch('/:id/status', verifyAccess, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Employee), updateAppointmentStatus);

export default router;