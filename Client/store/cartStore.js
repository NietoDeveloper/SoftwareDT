// frontend/store/cartStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Zustand store for managing shopping cart state.
 * Includes actions for adding, removing, updating, and clearing items.
 * Provides selector functions for calculated values like total price and item count.
 * Uses persist middleware to save cart state to localStorage.
 */
export const useCartStore = create(
    // Apply persist middleware for localStorage saving
    persist(
        // Store definition function receives 'set' and 'get'
        (set, get) => ({
            // --- State ---
            items: [], // Array of { product: ProductObject, quantity: number }

            // --- Actions ---

            /**
             * Adds a product to the cart or increases its quantity if it already exists.
             * @param {object} product - The product object to add.
             * @param {number} quantity - The quantity to add (defaults to 1).
             */
            addItem: (product, quantity = 1) => {
                // Use set((state) => ...) for updates based on current state
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.product.id === product.id
                    );
                    let newItems = [...state.items]; // Create a new array to avoid mutation

                    if (existingItemIndex > -1) {
                        // Item already exists, update quantity
                        const currentItem = newItems[existingItemIndex];
                        const newQuantity = currentItem.quantity + quantity;
                        // Optional: Add check against product.stock here if available
                        // if (product.stock && newQuantity > product.stock) {
                        //     console.warn(`Cannot add more ${product.name}, stock limit reached.`);
                        //     // Optionally show a notification to the user
                        //     return { items: newItems }; // Return unchanged state
                        // }
                        newItems[existingItemIndex] = {
                            ...currentItem,
                            quantity: newQuantity,
                        };
                        console.log(`Updated quantity for ${product.name} to ${newQuantity}`);
                    } else {
                        // Item does not exist, add new item
                        // Optional: Check stock before adding
                        // if (product.stock && quantity > product.stock) {
                        //     console.warn(`Cannot add ${quantity} of ${product.name}, only ${product.stock} in stock.`);
                        //     // Optionally show a notification
                        //     return { items: newItems }; // Return unchanged state
                        // }
                        newItems.push({ product: product, quantity: quantity });
                        console.log(`Added ${quantity} of ${product.name} to cart`);
                    }
                    return { items: newItems }; // Return the updated state object
                });
            },

            /**
             * Removes a product completely from the cart.
             * @param {number|string} productId - The ID of the product to remove.
             */
            removeItem: (productId) => {
                set((state) => {
                    const updatedItems = state.items.filter(
                        (item) => item.product.id !== productId
                    );
                    console.log(`Removed product ID ${productId} from cart`);
                    return { items: updatedItems };
                });
            },

            /**
             * Updates the quantity of a specific product in the cart.
             * Removes the item if quantity becomes 0 or less.
             * @param {number|string} productId - The ID of the product to update.
             * @param {number} quantity - The new quantity.
             */
            updateQuantity: (productId, quantity) => {
                set((state) => {
                    // Ensure quantity is a non-negative number
                    const newQuantity = Math.max(0, quantity);

                    if (newQuantity === 0) {
                         // If quantity is 0, filter out the item (same as remove)
                         console.log(`Quantity set to 0 for product ID ${productId}, removing from cart.`);
                        return {
                            items: state.items.filter((item) => item.product.id !== productId),
                        };
                    } else {
                         // Update quantity for the specific item
                        console.log(`Updating quantity for product ID ${productId} to ${newQuantity}`);
                         return {
                            items: state.items.map((item) =>
                                item.product.id === productId
                                    // Optional: Check against stock when updating
                                    // ? { ...item, quantity: Math.min(newQuantity, item.product.stock || newQuantity) }
                                    ? { ...item, quantity: newQuantity }
                                    : item
                            )
                        };
                    }
                });
            },

            /**
             * Removes all items from the cart.
             */
            clearCart: () => {
                console.log("Clearing cart");
                set({ items: [] }); // Reset items to an empty array
            },


            // --- Selectors (Computed Values) ---
            // These functions use get() to access the current state *inside* the store definition.
            // Components can then select these functions directly using useCartStore((state) => state.getCartTotal())

            /**
             * Calculates the total price of all items in the cart.
             * @returns {number} The total price.
             */
            getCartTotal: () => {
                 const items = get().items; // Use get() to access current items array
                 return items.reduce((total, item) => {
                     // Ensure price is a number before calculation
                     const price = Number(item.product.price) || 0;
                     const quantity = Number(item.quantity) || 0;
                     return total + price * quantity;
                 }, 0);
             },

             /**
              * Calculates the total number of individual items in the cart (sum of quantities).
              * @returns {number} The total item count.
              */
             getCartItemCount: () => {
                 const items = get().items; // Use get()
                 return items.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
             },

        }), // End of store definition function

        // --- Persist Middleware Configuration ---
        {
            name: 'cart-storage', // Unique key for localStorage item
            storage: createJSONStorage(() => localStorage), // Use localStorage adapter
            // Optional: Define which parts of the state to persist (if needed)
            // partialize: (state) => ({ items: state.items }),
        }
    ) // End of persist call
); // End of create call