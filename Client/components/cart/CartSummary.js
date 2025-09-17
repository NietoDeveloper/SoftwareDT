// frontend/components/cart/CartSummary.js
import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore'; // Import Zustand store hook
import Button from '@/components/common/Button'; // Import reusable Button

/**
 * Displays the order summary based on the current cart state.
 * Includes subtotal, estimated shipping/tax, and total.
 * Provides links to checkout or continue shopping.
 */
const CartSummary = () => {
    // --- Zustand Store Access ---
    // Select the calculated subtotal *directly* using the selector function from the store.
    // This hook will re-render the component only when the *result* of getCartTotal() changes.
    const subtotal = useCartStore((state) => state.getCartTotal());

    // --- Calculations ---
    // Calculate shipping, tax, and total based on the subtotal.
    // Replace these with your actual shipping/tax calculation logic later.
    const shippingEstimate = subtotal > 0 ? 5.00 : 0; // Example: $5 shipping if cart not empty
    const taxRate = 0.08; // Example: 8% tax rate
    const taxEstimate = subtotal * taxRate;
    const orderTotal = subtotal + shippingEstimate + taxEstimate;

    // Log rendering for debugging potential loops
    console.log("CartSummary Rendering - Subtotal:", subtotal);

    // --- Render Logic ---
    return (
        // Sticky container for the summary on larger screens
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                Order Summary
            </h2>
            <div className="space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                {/* Shipping Estimate */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <p>Shipping estimate</p>
                    <p>${shippingEstimate.toFixed(2)}</p>
                </div>
                {/* Tax Estimate */}
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <p>Tax estimate ({ (taxRate * 100).toFixed(0) }%)</p>
                    <p>${taxEstimate.toFixed(2)}</p>
                </div>
                {/* Order Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex justify-between text-base font-bold text-gray-900 dark:text-gray-100">
                    <p>Order total</p>
                    <p>${orderTotal.toFixed(2)}</p>
                </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
                 {/* Link to checkout page, disabled if cart is empty */}
                 <Link href="/checkout" passHref legacyBehavior={false}>
                    <Button
                       className="w-full text-center"
                       disabled={subtotal <= 0} // Disable if cart is empty
                       variant="primary"
                       aria-disabled={subtotal <= 0}
                    >
                        Proceed to Checkout
                    </Button>
                 </Link>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                <p> or{' '}
                    <Link href="/#products" className="font-medium text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                       Continue Shopping<span aria-hidden="true"> →</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default CartSummary;