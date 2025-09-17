// frontend/components/cart/CartItem.js
import React from 'react'; // No other hooks needed here directly
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore'; // Import Zustand store hook
import { TrashIcon } from '@heroicons/react/24/outline'; // Ensure icons are installed

/**
 * Renders a single item within the shopping cart list.
 * Allows quantity updates and item removal.
 * @param {object} item - The cart item object, expected to have { product: {...}, quantity: number }
 */
const CartItem = ({ item }) => {
    // --- Zustand Store Access ---
    // Select actions individually from the store. This is generally more performant
    // than selecting an object containing actions, as function references are stable.
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);

    // --- Basic Validation ---
    // If the item or its product data is missing, render nothing.
    if (!item || !item.product) {
        console.warn("CartItem received invalid item prop:", item);
        return null;
    }

    // --- Event Handlers ---
    /**
     * Handles changes to the quantity input field.
     * Parses the new value and calls the updateQuantity action from the store.
     */
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        // Update only if it's a valid number, ensuring quantity is at least 1.
        if (!isNaN(newQuantity)) {
            updateQuantity(item.product.id, Math.max(1, newQuantity));
        }
    };

    /**
     * Handles clicking the remove button.
     * Calls the removeItem action from the store.
     */
    const handleRemove = () => {
        removeItem(item.product.id);
    };

    // --- Image URL Handling ---
    // Use the product's image URL or a fallback placeholder.
    const imageUrl = item.product.image_url || '/placeholder-image.png'; // Ensure placeholder exists in /public

    // --- Render Logic ---
    return (
        <li className="flex py-6 px-4 sm:px-6 items-start sm:items-center"> {/* Align items better on small screens */}
            {/* Product Image */}
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden relative">
                <Image
                    src={imageUrl}
                    alt={item.product.name || 'Product image'}
                    fill // Use fill layout
                    className="object-cover" // Cover the container
                    sizes="(max-width: 640px) 20vw, 10vw" // Adjust sizes for small image
                    onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                />
            </div>

            {/* Product Details and Actions */}
            <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between">
                {/* Left side: Name and Price */}
                <div className="flex-1 pr-4 mb-2 sm:mb-0"> {/* Added padding right */}
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                        <h3>
                            {/* Link to the product details page */}
                            <Link href={`/products/${item.product.id}`} className="hover:text-primary dark:hover:text-primary-light transition-colors">
                                {item.product.name}
                            </Link>
                        </h3>
                        {/* Display total price for this item (unit price * quantity) */}
                        <p className="ml-4 whitespace-nowrap">${parseFloat(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    {/* Display unit price for clarity */}
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                       Unit Price: ${parseFloat(item.product.price).toFixed(2)}
                    </p>
                </div>

                {/* Right side: Quantity and Remove */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    {/* Quantity Input */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded mb-2 sm:mb-0">
                        <label htmlFor={`quantity-${item.product.id}`} className="sr-only">Quantity for {item.product.name}</label>
                        <input
                           id={`quantity-${item.product.id}`}
                           type="number"
                           value={item.quantity} // Controlled input based on store state
                           onChange={handleQuantityChange} // Update store on change
                           min="1"
                           // Consider adding max based on available stock if needed: max={item.product.stock}
                           // Use input-field class or style directly
                           className="w-16 border-0 dark:bg-gray-700 dark:text-gray-200 text-center focus:ring-primary focus:border-primary py-1 rounded"
                           aria-label={`Quantity for ${item.product.name}`}
                        />
                    </div>

                    {/* Remove Button */}
                    <div className="flex justify-end sm:justify-start">
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="font-medium text-red-600 hover:text-red-500 dark:hover:text-red-400 flex items-center space-x-1 p-1 transition-colors"
                            title={`Remove ${item.product.name} from cart`}
                        >
                            <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5"/>
                            <span className="text-xs sm:text-sm">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartItem;