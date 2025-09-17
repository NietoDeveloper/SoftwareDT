// backend/routes/webhookRoutes.js
import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Stripe requires the raw body for signature verification
// Mount this route BEFORE express.json() middleware in server.js if possible,
// or use express.raw specifically here.
router.post('/stripe', express.raw({type: 'application/json'}), handleStripeWebhook);

export default router;