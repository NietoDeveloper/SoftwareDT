// backend/routes/orderRoutes.js
import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    createOrder,
    getOrderById,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// Place specific routes before dynamic ones like /:id

// Get logged in user's orders
router.get('/mine', protect, getMyOrders);

// Create a new order
router.post('/', protect, createOrder);

// Get all orders (Admin only)
router.get('/', protect, admin, getAllOrders);

// Get single order by ID (User owner or Admin)
router.get('/:id', protect, getOrderById);

// Update order status (Admin only)
router.put('/:id/status', protect, admin, updateOrderStatus);

// TODO: Add payment update route if implementing payments
// router.put('/:id/pay', protect, updateOrderToPaid);


export default router;