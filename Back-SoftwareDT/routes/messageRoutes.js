import express from 'express';
import { logMessage, getUserMessages } from '../controllers/messageController.js';
// Corrección de la ruta y del tipo de importación (Default import)
import verifyAccess from '../middleware/verifyAccess.js'; 

const router = express.Router();

/**
 * @route   POST /api/messages/log
 * @desc    Registra un evento de comunicación externa (WhatsApp/Email)
 * @access  Privado (Requiere Token a través de verifyAccess)
 */
router.post(
    '/log', 
    verifyAccess, 
    logMessage
);

/**
 * @route   GET /api/messages/user/:userId
 * @desc    Obtiene los últimos 10 logs de actividad para el panel del cliente
 * @access  Privado (Requiere Token + Validación de Identidad)
 */
router.get(
    '/user/:userId', 
    verifyAccess, 
    getUserMessages
);

export default router;