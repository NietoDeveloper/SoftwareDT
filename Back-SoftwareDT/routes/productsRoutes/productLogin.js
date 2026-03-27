import express from 'express';
const router = express.Router();

/**
 * 🔐 SOFTWARE DT - PRODUCT AUTH ROUTER
 * Protocolo de acceso para nodos de producto (S+ Tier)
 */
import { loginProduct } from '../../controllers/productController.js';

/**
 * @route   POST /api/product/login
 * @desc    Autenticación de productos para el Datacenter
 * @access  Public
 */
router.post('/', loginProduct);

export default router;