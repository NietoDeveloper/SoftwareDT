// frontend/lib/stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe.js asynchronously outside of component render cycles
// Use the publishable key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error("Stripe publishable key not found. Make sure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in .env.local");
}

export default stripePromise;