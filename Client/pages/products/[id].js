// frontend/pages/products/[id].js
import { useRouter } from 'next/router';
import api from '@/lib/api'; // Assuming API helper exists
import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { StarIcon } from '@heroicons/react/20/solid'; // Example for reviews
import Head from 'next/head'; // Import Head
import Button from '@/components/common/Button'; // Import Button

// Helper function for basic rating display (replace with actual rating logic)
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetailPage({ product, error }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const addItemToCart = useCartStore((state) => state.addItem);

    // Handle case where router is not ready yet (for fallback routes)
    if (router.isFallback) {
        return (
             <>
                 <Head><title>Loading Product...</title></Head>
                 <div className="text-center py-10">Loading product details...</div>
             </>
        );
    }

    // Handle case where product data couldn't be fetched server-side or is null
    if (error || !product) {
         return (
             <>
                 <Head><title>Product Not Found</title></Head>
                 <div className="text-center py-10 text-red-600">
                     <p>{error || 'Product not found.'}</p>
                     {/* Optionally add a link back to products */}
                 </div>
             </>
         );
    }

     const handleAddToCart = () => {
         addItemToCart(product, quantity);
         console.log(`${quantity} of ${product.name} added to cart`);
         // Add feedback like a toast notification
         alert(`${quantity} x ${product.name} added to cart!`); // Simple feedback
     };

     // Fallback image
     const imageUrl = product.image_url || '/placeholder-image.png'; // Ensure placeholder exists in /public

    return (
        <>
            <Head>
                {/* Dynamic title and description based on product */}
                <title>{`${product.name || "Product Details"} - Your E-commerce App`}</title>
                <meta name="description" content={product.description ? product.description.substring(0, 160) : `Details for ${product.name}`} />
                {/* Add Open Graph meta tags for sharing */}
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description ? product.description.substring(0, 160) : ''} />
                <meta property="og:image" content={imageUrl} />
            </Head>

            {/* Main content for product detail */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Image */}
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-md bg-gray-100 dark:bg-gray-800 relative"> {/* Ensure relative positioning */}
                       <Image
                            src={imageUrl}
                            alt={product.name}
                            fill // Use fill for modern layout
                            className="object-contain" // Use contain to show full image, or cover
                            onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                            priority // Prioritize loading LCP image
                            sizes="(max-width: 768px) 100vw, 50vw" // Adjust sizes
                        />
                    </div>

                    {/* Product Details */}
                    <div className="dark:text-gray-200">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">{product.name}</h1>
                        <p className="text-3xl text-primary font-semibold mb-4">
                            ${parseFloat(product.price).toFixed(2)}
                        </p>

                        {/* Example Reviews/Rating */}
                        <div className="mb-4">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                4 > rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600', // Example: Hardcoded 4-star rating
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">4 out of 5 stars</p>
                                <a href="#reviews" className="ml-3 text-sm font-medium text-primary hover:text-primary-dark">
                                    117 reviews {/* Example count */}
                                </a>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 mb-6">
                            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">Description</h2>
                            <p className="text-base text-gray-600 dark:text-gray-300">
                                {product.description || "No description provided."}
                            </p>
                        </div>

                        {/* Stock Info (Optional) */}
                        {product.stock !== undefined && (
                            <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {product.stock > 5 ? `${product.stock} in stock` : product.stock > 0 ? `Only ${product.stock} left!` : 'Out of stock'}
                            </p>
                        )}

                        {/* Quantity Selector & Add to Cart */}
                         {product.stock === undefined || product.stock > 0 ? (
                            <div className="flex items-center space-x-4 mb-6">
                                 <label htmlFor="quantity" className="sr-only">Quantity</label>
                                <select
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    // Use input-field class from globals.css or style directly
                                    className="block w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-center"
                                    disabled={product.stock !== undefined && product.stock <= 0}
                                >
                                    {/* Generate options based on stock, e.g., max 10 or stock */}
                                    {[...Array(Math.min(product.stock === undefined ? 10 : product.stock, 10)).keys()].map(i => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={product.stock !== undefined && product.stock <= 0}
                                    className="flex-1" // Make button take remaining space
                                    variant="primary"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                         ) : (
                             <p className="text-red-600 dark:text-red-400 font-medium mb-6 py-2 px-4 border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded">
                                 This product is currently out of stock.
                             </p>
                         )}
                        {/* Add other details: SKU, Categories, etc. */}
                    </div>
                </div>
                 {/* Optional Sections: Reviews, Related Products */}
                 {/* <div id="reviews" className="mt-12"> ... Reviews Component ... </div> */}
            </div>
        </>
    );
}

// --- Server-Side Rendering (SSR) for Product Detail ---
// (Keep this function as previously defined to fetch product data)
export async function getServerSideProps(context) {
    const { id } = context.params; // Get product ID from the URL parameter
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    console.log(`[getServerSideProps Product ${id}] Fetching from: ${apiUrl}/products/${id}`);

    try {
        const res = await fetch(`${apiUrl}/products/${id}`);
        console.log(`[getServerSideProps Product ${id}] Fetch status: ${res.status}`);

        if (!res.ok) {
             if (res.status === 404) {
                 return { notFound: true }; // Return 404 page if product not found
             }
             const errorText = await res.text();
             console.error(`[getServerSideProps Product ${id}] Fetch Failed: ${res.status}, ${errorText}`);
             throw new Error(`API Error (Status: ${res.status})`);
        }

        const product = await res.json();
        console.log(`[getServerSideProps Product ${id}] Fetched: ${product?.name}`);

        return {
            props: {
                product,
                error: null
            },
        };
    } catch (error) {
        console.error(`[getServerSideProps Product ${id}] CAUGHT ERROR:`, error);
        // Return error prop to the page component
        return {
            props: {
                product: null,
                error: `Could not load product details: ${error.message}. Check backend connection.`,
            },
        };
    }
}

// Optional: getStaticPaths if using Static Site Generation (SSG)
// export async function getStaticPaths() { ... }
// export async function getStaticProps({ params }) { ... }