// backend/controllers/paymentController.js
import stripe from '../config/stripe.js';
import pool from '../config/db.js'; // To potentially fetch product prices server-side

// Helper function (replace with actual logic)
// IMPORTANT: Calculate the order amount securely on the server-side!
// Do not trust the amount sent from the client. Fetch products from DB based on cart items.
const calculateOrderAmount = async (items /* Array of { productId, quantity } */) => {
    if (!items || items.length === 0) {
        return 0;
    }
    // 1. Get product IDs from items
    const productIds = items.map(item => item.productId);
    if (productIds.length === 0) return 0;

    // 2. Fetch prices from database
    // Use placeholders for security against SQL injection
    const placeholders = productIds.map(() => '?').join(',');
    const sql = `SELECT id, price FROM products WHERE id IN (${placeholders})`;
    const [products] = await pool.query(sql, productIds); // Use pool directly or queryWithRetry

    // 3. Calculate total based on fetched prices and item quantities
    let total = 0;
    const productPriceMap = new Map(products.map(p => [p.id, parseFloat(p.price)]));

    for (const item of items) {
        const price = productPriceMap.get(item.productId);
        if (price) {
            total += price * item.quantity;
        } else {
            console.warn(`Product ID ${item.productId} not found in DB during amount calculation.`);
            // Handle this case - maybe throw an error?
            throw new Error(`Product ID ${item.productId} not found or has no price.`);
        }
    }

    // Return amount in the smallest currency unit (e.g., cents for USD)
    return Math.round(total * 100);
};


// --- Create Payment Intent ---
// @desc    Create or update a Stripe Payment Intent
// @route   POST /api/payments/create-payment-intent
// @access  Private (User must be logged in)
export const createPaymentIntent = async (req, res, next) => {
    const { items } = req.body; // Get cart items from request body

    if (!items || !Array.isArray(items)) {
         res.status(400);
         return next(new Error('Cart items are required.'));
    }

    try {
        // **IMPORTANT:** Calculate amount server-side based on items
        const amount = await calculateOrderAmount(items);

        if (amount <= 0) {
             res.status(400);
             return next(new Error('Cannot process order with zero or negative amount.'));
        }

        console.log(`Creating Payment Intent for amount: ${amount} cents`);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd', // Change to your desired currency
            // Enable automatic capture and common payment method types
            automatic_payment_methods: {
                enabled: true,
            },
            // Optional: Add metadata (e.g., user ID, order details for reference)
            // metadata: {
            //     userId: req.user.id, // Assuming protect middleware attached user
            //     cartItems: JSON.stringify(items.map(i => i.productId)),
            // }
        });

        // Send publishable key and client secret back to client
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
            // publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY // Client already has this
        });

    } catch (error) {
        console.error("Stripe Payment Intent Error:", error);
        // Differentiate between calculation error and Stripe API error
        if (error.message.includes('Product ID')) {
            res.status(400); // Bad request if product details invalid
        } else {
             res.status(500); // Server error for Stripe issues
        }
        next(new Error(`Failed to create payment intent: ${error.message}`));
    }
};