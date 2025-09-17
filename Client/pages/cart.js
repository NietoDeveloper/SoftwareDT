// frontend/pages/cart.js
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '@/components/common/Button'; // Import Button
import Head from 'next/head'; // Import Head
import CartItem from '@/components/cart/CartItem'; // Import CartItem if using it
import CartSummary from '@/components/cart/CartSummary'; // Import CartSummary if using it

export default function CartPage() {
    // Select state and actions using individual hooks for potential optimization
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);

    // Note: CartItem and CartSummary components now contain the logic for
    // removeItem, updateQuantity, getCartTotal etc. If you haven't refactored
    // like that, you might need to select those actions here as well.

    return (
        <>
            <Head>
                 <title>Shopping Cart - Your E-commerce App</title>
                 <meta name="description" content="Review items in your shopping cart and proceed to checkout."/>
            </Head>

            {/* Main content area for the cart page */}
            <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-15rem)]"> {/* Added min-height */}
                <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Your Shopping Cart</h1>

                {items.length === 0 ? (
                    // Empty Cart Message
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Your cart is currently empty.</p>
                         <Link href="/#products">
                            <Button variant="primary">Continue Shopping</Button>
                         </Link>
                    </div>
                ) : (
                    // Cart with Items
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-grow lg:w-2/3">
                            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {/* Ensure CartItem component exists and works */}
                                    {items.map((item) => (
                                        <CartItem key={item.product.id} item={item} />
                                    ))}
                                </ul>
                                 {/* Clear Cart Button */}
                                 <div className="border-t border-gray-200 dark:border-gray-700 py-4 px-4 sm:px-6 text-right">
                                     <Button onClick={clearCart} variant="danger" size="sm">
                                         Clear Cart
                                     </Button>
                                 </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        {/* Ensure CartSummary component exists and works */}
                        <div className="lg:w-1/3">
                            <CartSummary />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}