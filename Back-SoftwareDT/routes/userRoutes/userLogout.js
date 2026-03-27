import express from 'express';
const router = express.Router();
import { handleUserLogout } from '../../controllers/userController.js'; 

/**
 * SOFTWARE DT - PROTOCOLO DE DESCONEXIÓN
 * @route   POST /api/user/logout
 * @access  Public (El controlador gestiona la limpieza interna)
 */
router.post('/', handleUserLogout);

export default router;