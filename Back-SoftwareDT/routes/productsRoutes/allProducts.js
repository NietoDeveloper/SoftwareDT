import express from 'express';
const router = express.Router();

/**
 * 🛠️ SOFTWARE DT - PRODUCT DATA ROUTER
 * Sincronización: Catálogo -> Cards -> BookingPage
 * Nivel de Importación: S+ Tier (Double Level Exit)
 */
import { 
    getAllProducts, 
    getSingleProduct 
} from '../../controllers/productController.js'; 

/**
 * @route   GET /api/products
 * @desc    Obtener catálogo completo (Datacenter Products)
 * @access  Public
 * @note    Alimenta la vista de Cards en el frontend (isDynamic: true)
 */
router.route('/')
    .get(getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Obtener especificaciones técnicas (Nodo Único)
 * @access  Public
 * @note    Flujo Crítico: Solutions -> Product Detail -> BookingPage
 */
router.route('/:id')
    .get(getSingleProduct);

export default router;