// backend/routes/productRoutes.js
import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts // Import the search controller function
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // Middleware for protected routes

const router = express.Router();

// --- Public Routes ---

// GET /api/products/search?q=... - Search for products (Must be BEFORE /:id)
router.get('/search', searchProducts);

// GET /api/products - Fetch all products
router.get('/', getAllProducts);

// GET /api/products/:id - Fetch a single product by its ID
router.get('/:id', getProductById);


// --- Admin Routes (Require Authentication and Admin Role) ---

// POST /api/products - Create a new product
router.post('/', protect, admin, createProduct);

// PUT /api/products/:id - Update an existing product
router.put('/:id', protect, admin, updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', protect, admin, deleteProduct);


export default router;