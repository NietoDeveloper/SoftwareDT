import express from 'express';
const router = express.Router();

/**
 * SDT AUTH PROTOCOL: Refresh Token (S+ Tier)
 * Sincronización: Acceso a controladores desde subcarpeta de rutas
 */
import { handleProductRefreshToken } from '../../controllers/productRefreshController.js';

/**
 * @route   GET /api/product/refresh
 * @desc    Renovación de sesión para el Dashboard (MVP SDT)
 * @access  Public (Valida Cookie)
 */
router.get('/', handleProductRefreshToken);

export default router;