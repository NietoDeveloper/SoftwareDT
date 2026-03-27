import express from 'express';
const router = express.Router();

/**
 * 🛠️ SOFTWARE DT - PRODUCT REGISTRATION
 * Protocolo de alta de nuevos productos en el Datacenter.
 */
import { registerProduct } from '../../controllers/productController.js';

/**
 * @route   POST /api/product/register
 * @access  Public
 */
router.post('/', registerProduct);

export default router;