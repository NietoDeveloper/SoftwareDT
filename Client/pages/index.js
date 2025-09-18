// frontend/pages/index.js
import ProductList from '@/components/products/ProductList'; // Component to display products
import api from '@/lib/api'; // Your API helper instance (e.g., configured Axios)
import { useEffect, useState } from 'react';
import Head from 'next/head'; // Import Head for setting page title, meta tags

// HomePage component receives initial props from getServerSideProps
export default function HomePage({ initialProducts, error: ssrError }) {
    // State for products: Initialize with server-fetched data, otherwise null
    const [products, setProducts] = useState(initialProducts);
    // Loading state: True only if SSR failed and we need to fetch client-side
    const [loading, setLoading] = useState(!initialProducts && !ssrError);
    // Error state: Use SSR error first, then potentially client-fetch error
    const [error, setError] = useState(ssrError || null);

     // Client-side data fetching: Only runs if initialProducts are null (SSR failed)
     useEffect(() => {
        // If we already have products or an SSR error, don't fetch on client
        if (initialProducts || ssrError) {
            return;
        }

        // Define async function to fetch products
        const fetchProducts = async () => {
            console.log("HomePage: Attempting client-side fetch...");
            setLoading(true);
            setError(null); // Clear previous errors
            try {
                const response = await api.get('/products'); // Fetch from backend API
                setProducts(response.data); // Update state with fetched products
                console.log("HomePage: Client-side fetch successful.");
            } catch (err) {
                console.error("HomePage: Client-side fetch failed:", err);
                // Set error state based on API response or generic message
                setError(err.message || 'Could not load products. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false regardless of outcome
            }
        };

        fetchProducts(); // Execute the fetch function

    // Dependency array: This effect runs only once on mount if SSR failed
    }, [initialProducts, ssrError]);

    // --- Render Logic ---
    // The Layout component (Navbar/Footer) is applied globally in _app.js
    // This component returns only the content specific to the homepage.
    return (
        <>
            {/* Page Head: Set title and meta description for SEO and browser tab */}
            <Head>
                <title>Welcome to Our Store - Your E-commerce App</title>
                 <meta name="description" content="Discover amazing products and shop the latest trends in our modern e-commerce store."/>
                 {/* Add other relevant meta tags: Open Graph, Twitter Cards etc. */}
            </Head>

            {/* Hero Section: Engaging introduction banner */}
            <section className="bg-gradient-to-r from-cyan-100 via-purple-100 to-pink-100 dark:from-cyan-900 dark:via-purple-900 dark:to-pink-900 text-center py-16 md:py-24 mb-12 rounded-lg shadow-md">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4 px-4">
                    Software Dorado Technology
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto px-4">
                    Shop the latest trends and find your next favorite item. High quality, great prices.
                </p>
                {/* Link styled as a button using Tailwind components defined in globals.css */}
                <a href="#products" className="btn btn-primary btn-lg inline-block px-8 py-3 text-base md:text-lg">
                    Shop Now
                </a>
            </section>

            {/* Product Listing Section */}
            {/* Added scroll-mt-20 to offset the anchor link scroll position due to sticky navbar */}
            <section id="products" className="scroll-mt-20">
                <h2 className="text-3xl font-semibold mb-8 text-center md:text-left text-gray-800 dark:text-gray-200">
                    Featured Products
                </h2>

                {/* Conditional rendering based on loading and error states */}
                {loading && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Loading products...</p>
                        {/* Optional: Add a spinner animation */}
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
                        <p className="text-red-600 dark:text-red-300 font-medium">Error loading products:</p>
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>
                    </div>
                )}

                {/* Render ProductList only if not loading, no error, and products exist */}
                {!loading && !error && products && products.length > 0 && (
                    <ProductList products={products} />
                )}

                {/* Message if not loading, no error, but no products found */}
                 {!loading && !error && (!products || products.length === 0) && (
                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <p>No products found at this time. Please check back later!</p>
                     </div>
                )}
            </section>

             {/* Optional: Add other homepage sections here (e.g., Categories, About Us snippet) */}
             {/*
             <section className="mt-16">
                 <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>
                 // Category display components...
             </section>
             */}
        </>
    );
}

// --- Server-Side Rendering (SSR) ---
// Fetches initial product data on the server before sending the page to the client.
export async function getServerSideProps(context) {
    // Get API URL from environment variable, fallback to localhost for safety
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
    const productsUrl = `${apiUrl}/products`;
    console.log(`[getServerSideProps Index] Attempting to fetch from: ${productsUrl}`);

    try {
        // Fetch products from the backend API
        const res = await fetch(productsUrl);
        console.log(`[getServerSideProps Index] Fetch response status: ${res.status}`);

        // Check if the fetch was successful
        if (!res.ok) {
            // Attempt to get more error details from the response body
            const errorText = await res.text();
            console.error(`[getServerSideProps Index] Fetch failed: ${res.status} ${res.statusText}`);
            console.error(`[getServerSideProps Index] Error response body: ${errorText}`);
            // Throw an error to be caught by the catch block
            throw new Error(`API request failed with status ${res.status}`);
        }

        // Parse the JSON response
        const products = await res.json();
        console.log(`[getServerSideProps Index] Successfully fetched ${products?.length ?? 0} products.`);

        // Return fetched products as props to the HomePage component
        return {
            props: {
                initialProducts: products,
                error: null // No error occurred
            },
        };
    } catch (error) {
        // Log the error that occurred during the fetch or processing
        console.error('[getServerSideProps Index] CAUGHT ERROR:', error);
        // Return props indicating an error occurred, passing the error message
        return {
            props: {
                initialProducts: null, // No products fetched
                error: `SSR Error: ${error.message}. Could not load products. Please ensure the backend is running and accessible at ${apiUrl}.`, // Pass error message to the component
            },
        };
    }
}