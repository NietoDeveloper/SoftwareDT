import express from 'express';
const router = express.Router();

/**
 * ⚙️ SOFTWARE DT - PRODUCT CONFIGURATION
 * Actualización de especificaciones técnicas y metadata del producto.
 */
import { updateProduct } from '../../controllers/productController.js';

/**
 * @route   PATCH /api/product/update
 * @access  Private (Requiere verifyAccess en server.js)
 */
router.patch('/', updateProduct);

export default router;