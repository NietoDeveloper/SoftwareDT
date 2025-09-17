// backend/controllers/webhookController.js
import stripe from '../config/stripe.js';
import pool from '../config/db.js';

export const handleStripeWebhook = async (req, res, next) => {
     const sig = req.headers['stripe-signature'];
     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

     if (!sig || !webhookSecret) {
         console.log('Webhook Error: Missing signature or secret.');
         return res.status(400).send('Webhook Error: Missing signature or secret.');
     }

     let event;
     try {
         // Use the raw body buffer for verification
         event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
         console.log(`Webhook received: ${event.type}`);
     } catch (err) {
         console.error(`Webhook signature verification failed: ${err.message}`);
         return res.status(400).send(`Webhook Error: ${err.message}`);
     }

     // Handle the event
     switch (event.type) {
         case 'payment_intent.succeeded':
             const paymentIntentSucceeded = event.data.object;
             console.log('PaymentIntent succeeded:', paymentIntentSucceeded.id);
             // TODO: Find the corresponding order in your database (e.g., using metadata if you stored orderId)
             // const orderId = paymentIntentSucceeded.metadata.orderId; // Example metadata
             // If found, update the order status to 'processing' or 'paid'
             // try {
             //    await pool.query("UPDATE orders SET status = ?, payment_intent_id = ? WHERE id = ?", ['processing', paymentIntentSucceeded.id, orderId]);
             //    console.log(`Order ${orderId} status updated to processing.`);
             // } catch (dbError) {
             //    console.error(`Failed to update order status for PaymentIntent ${paymentIntentSucceeded.id}:`, dbError);
             //    // Consider returning 500 to signal Stripe to retry if needed, but handle carefully
             // }
             break;

         case 'payment_intent.payment_failed':
             const paymentIntentFailed = event.data.object;
             console.log('PaymentIntent failed:', paymentIntentFailed.id, paymentIntentFailed.last_payment_error?.message);
              // TODO: Update order status to 'failed' or notify admin/user
             break;

         // ... handle other event types as needed (e.g., checkout.session.completed if using Stripe Checkout)

         default:
             console.log(`Unhandled event type ${event.type}`);
     }

     // Return a 200 response to acknowledge receipt of the event
     res.status(200).json({ received: true });
 };