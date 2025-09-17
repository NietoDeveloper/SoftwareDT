// backend/routes/adminRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

// Assuming Product routes needing admin are in productRoutes.js already
// import { createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

// Import User controllers
import {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserRole
} from '../controllers/userController.js';

// Assuming Order routes needing admin are in orderRoutes.js already
// import { getAllOrders, updateOrderStatus } from '../controllers/orderController.js';


const router = express.Router();

// Apply admin middleware to all routes in this file
router.use(protect, admin); // Ensures user is logged in AND is an admin

// --- User Management Routes ---
router.get('/users', getAllUsers);        // GET /api/admin/users
router.get('/users/:id', getUserById);    // GET /api/admin/users/:id
router.delete('/users/:id', deleteUser);  // DELETE /api/admin/users/:id
router.put('/users/:id/role', updateUserRole); // PUT /api/admin/users/:id/role

// --- Product Management Routes (Could also live in productRoutes with admin check) ---
// Example: if you wanted them grouped under /api/admin/products
// router.post('/products', createProduct);
// router.put('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);


// --- Order Management Routes (Could also live in orderRoutes with admin check) ---
// Example: if you wanted them grouped under /api/admin/orders
// router.get('/orders', getAllOrders);
// router.put('/orders/:id/status', updateOrderStatus);


export default router;