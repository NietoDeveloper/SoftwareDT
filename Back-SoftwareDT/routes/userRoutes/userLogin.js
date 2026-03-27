import express from 'express';
const router = express.Router();
import { userLogin } from '../../controllers/userController.js'; 

/**
 * SOFTWARE DT - AUTHENTICATION GATEWAY
 * @route   POST /api/user/login
 * @access  Public
 */
router.post('/', userLogin); 

export default router;