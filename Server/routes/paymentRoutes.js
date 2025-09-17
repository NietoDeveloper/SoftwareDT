// backend/routes/paymentRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Protect the endpoint
import { createPaymentIntent } from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/payments/create-payment-intent
router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;