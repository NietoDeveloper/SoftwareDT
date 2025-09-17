// frontend/pages/search.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductList from '@/components/products/ProductList'; // Re-use the product list component
import Head from 'next/head';

export default function SearchPage() {
    const router = useRouter();
    const { q: searchQuery } = router.query; // Get the search query 'q' from the URL

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); // Track if a search has been attempted

    useEffect(() => {
        // Only fetch results if the router is ready AND searchQuery exists
        if (router.isReady && searchQuery && typeof searchQuery === 'string') {
            const fetchSearchResults = async () => {
                setLoading(true);
                setError(null);
                setHasSearched(true); // Mark that a search is being performed
                console.log(`Searching for: "${searchQuery}"`);
                try {
                    const response = await api.get(`/products/search?q=${encodeURIComponent(searchQuery)}`);
                    setResults(response.data);
                } catch (err) {
                    console.error("Search fetch error:", err);
                    setError(err.message || "Failed to fetch search results.");
                    setResults([]); // Clear previous results on error
                } finally {
                    setLoading(false);
                }
            };
            fetchSearchResults();
        } else if (router.isReady && !searchQuery) {
             // Handle case where user navigates to /search without a query
             setResults([]);
             setError(null);
             setLoading(false);
             setHasSearched(false); // Not really a search attempt
        }
    // Depend on router readiness and the actual search query value
    }, [router.isReady, searchQuery]);

    return (
        <>
            <Head>
                <title>{searchQuery ? `Search results for "${searchQuery}"` : "Search Products"} - Your E-commerce App</title>
                <meta name="description" content={`Find products matching "${searchQuery}"`} />
            </Head>

            <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-15rem)]">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                    {searchQuery ? `Search Results for "${searchQuery}"` : "Search Products"}
                </h1>

                {/* Display Loading State */}
                {loading && (
                     <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Searching...</p>
                    </div>
                )}

                {/* Display Error State */}
                {error && !loading && (
                    <div className="text-center py-10 bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800">
                        <p className="text-red-600 dark:text-red-300 font-medium">Error performing search:</p>
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{error}</p>
                    </div>
                )}

                {/* Display Results or No Results Message */}
                {!loading && !error && hasSearched && (
                    results.length > 0 ? (
                        <ProductList products={results} />
                    ) : (
                         <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            <p>No products found matching your search term &quot;{searchQuery}&quot;.</p>
                         </div>
                    )
                )}

                {/* Initial state before search */}
                 {!loading && !error && !hasSearched && !searchQuery && (
                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                         <p>Please enter a search term in the navigation bar above.</p>
                     </div>
                 )}

            </div>
        </>
    );
}