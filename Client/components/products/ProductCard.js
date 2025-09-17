// frontend/components/products/ProductCard.js
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Ensure icons are installed

const ProductCard = ({ product }) => {
    const addItemToCart = useCartStore((state) => state.addItem);

    const handleAddToCart = (e) => {
         // Prevent the click event from bubbling up to the parent Link component
         e.preventDefault();
         e.stopPropagation();
         addItemToCart(product, 1); // Add 1 item to the cart
         // Optional: Add user feedback (e.g., toast notification)
         console.log(`${product.name} added to cart`);
     };

    // Basic check: If product data is missing, render nothing (or a placeholder)
    if (!product) {
        return null;
    }

    // Determine the image URL, using a placeholder if the product's URL is missing
    const imageUrl = product.image_url || '/placeholder-image.png'; // Ensure placeholder exists in /public

    return (
         // The Link component wraps the entire card structure
         <Link href={`/products/${product.id}`}>
              {/* This single div becomes the direct child of Link and holds the card styling */}
              <div className="group block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white h-full flex flex-col cursor-pointer"> {/* Added h-full, flex, flex-col, cursor-pointer */}

                  {/* Image Container */}
                  <div className="relative w-full aspect-square overflow-hidden flex-shrink-0"> {/* Added flex-shrink-0 to prevent image growing */}
                      <Image
                          src={imageUrl}
                          alt={product.name || 'Product image'}
                          fill // Use fill to cover the container space
                          className="object-cover group-hover:opacity-90 transition-opacity duration-300" // object-cover ensures aspect ratio is maintained while filling
                          // Provide sizes prop for optimization when using fill=true
                          // Adjust these values based on your grid layout breakpoints
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                          onError={(e) => { e.target.src = '/placeholder-image.png'; }} // Fallback on error
                          priority={false} // Usually false unless it's a high-priority above-the-fold image
                      />
                  </div>

                  {/* Product Info Container */}
                  <div className="p-4 flex flex-col flex-grow"> {/* flex-grow allows this section to fill remaining space */}
                       {/* Product Name - Allow it to grow but truncate if too long */}
                       <h3 className="text-lg font-semibold text-gray-800 truncate mb-1 group-hover:text-primary flex-grow">
                          {product.name || 'Unnamed Product'}
                      </h3>
                      {/* Bottom section with price and add-to-cart button */}
                      <div className="flex justify-between items-center mt-3 flex-shrink-0"> {/* flex-shrink-0 prevents this from shrinking */}
                          <p className="text-xl font-bold text-primary">
                              {/* Format price, display N/A if missing */}
                              ${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}
                          </p>
                          {/* Add to Cart Button */}
                          <button
                              onClick={handleAddToCart}
                              className="p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-primary-light hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary"
                              aria-label={`Add ${product.name} to cart`}
                              title={`Add ${product.name} to cart`} // Tooltip for clarity
                          >
                              <ShoppingCartIcon className="h-5 w-5" />
                          </button>
                      </div>
                  </div>
              </div>
         </Link>
    );
};

export default ProductCard;