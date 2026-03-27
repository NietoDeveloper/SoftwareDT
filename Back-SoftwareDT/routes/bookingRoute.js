import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';

/**
 * 🛠️ SOFTWARE DT - ROUTER DE RESERVAS (BOOKING)
 * Sincronización S+: Solutions -> Products -> BookingPage
 */
// ⚡ CORRECCIÓN: Importamos desde el controlador real 'appointmentController.js'
import { 
    appointmentBooking 
} from '../controllers/appointmentController.js'; 

import verifyAccess from '../middleware/verifyAccess.js'; 

/**
 * @route   POST /api/booking/confirm
 * @desc    Impacto en Dashboard en tiempo real (Paso 1 MVP)
 * @note    Se mapea a appointmentBooking para mantener consistencia S+
 */
router.post('/confirm', verifyAccess, asyncHandler(appointmentBooking));

/**
 * @route   POST /api/booking (Opcional, para compatibilidad)
 */
router.post('/', verifyAccess, asyncHandler(appointmentBooking));

export default router;