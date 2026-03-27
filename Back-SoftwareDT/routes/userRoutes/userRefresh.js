import express from 'express';
const router = express.Router();
import { handleRefreshToken } from '../../controllers/refreshTokenController.js'; 

/**
 * SOFTWARE DT - PROTOCOLO DE PERSISTENCIA (Silent Refresh)
 * @route   GET /api/user/refresh
 * @desc    Sincroniza el estado de autenticación usando la Cookie HttpOnly (jwt).
 * @access  Public (La validación reside en el Refresh Token de la Cookie)
 */
router.get('/', handleRefreshToken);

export default router;