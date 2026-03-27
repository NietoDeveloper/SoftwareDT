import express from 'express';
const router = express.Router();
import { updateUserDetails } from '../../controllers/userController.js'; 

/**
 * 🛠️ SOFTWARE DT - ACTUALIZACIÓN DE NODOS (USUARIOS)
 * Endpoint: /api/user/update
 * Protocolo S+: Permite actualización por Token (Autogestión) o ID (Admin)
 */

// El controlador 'updateUserDetails' debe estar preparado para priorizar 
// req.userId (extraído por verifyAccess) sobre req.params.id por seguridad.
router.put('/:id?', updateUserDetails);

// Opcional: Podrías añadir un GET aquí mismo para refrescar la info del panel
// router.get('/profile', getSingleUser); 

export default router;