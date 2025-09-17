// backend/config/stripe.js
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

if (!process.env.STRIPE_SECRET_KEY) {
    console.error("FATAL ERROR: STRIPE_SECRET_KEY is not defined in environment variables.");
    // Exit in dev if key is missing, handle differently in production if needed
    process.exit(1);
}

// Initialize Stripe with the secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20', // Use the latest API version or one you are comfortable with
});

export default stripe;