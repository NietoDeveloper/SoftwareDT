// frontend/components/layout/Navbar.js
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import Logo from '@/components/common/Logo';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'; // Added useEffect for clearing search on navigation
import { ShoppingCartIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    // State for the search input
    const [searchTerm, setSearchTerm] = useState('');
    // State to control mobile menu visibility (example)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Clear search term when navigating away from search page (optional)
    useEffect(() => {
      if (!router.pathname.startsWith('/search')) {
        setSearchTerm('');
      }
    }, [router.pathname]);

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    // Handler for submitting the search form
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedTerm = searchTerm.trim();
        if (trimmedTerm) {
            router.push(`/search?q=${encodeURIComponent(trimmedTerm)}`);
            // setSearchTerm(''); // Optional: Clear input after submit? Or keep it?
            setIsMobileMenuOpen(false); // Close mobile menu on search
        }
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Logo /> {/* Assuming Logo handles its own size/styling */}
                    </div>

                    {/* Desktop Navigation & Search */}
                    <div className="hidden md:flex items-center space-x-4 flex-grow justify-center px-4"> {/* Allow flex-grow */}
                        {/* Desktop Links */}
                        <div className="flex items-baseline space-x-4">
                            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link href="/#products" scroll={true} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</Link>
                            {/* Add other links here */}
                        </div>

                        {/* Desktop Search Form */}
                        <form onSubmit={handleSearchSubmit} className="ml-6 relative max-w-xs w-full"> {/* Added max-width */}
                            <label htmlFor="desktop-search" className="sr-only">Search products</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                                </div>
                                <input
                                    id="desktop-search"
                                    type="search"
                                    name="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                            <button type="submit" className="sr-only">Search</button>
                        </form>
                    </div>

                    {/* Right side Icons/Actions */}
                    <div className="hidden md:flex items-center space-x-3"> {/* Adjusted spacing */}
                         {/* Cart Icon */}
                         <Link href="/cart" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light p-1 rounded-full relative" aria-label="View shopping cart">
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                            {/* Add Cart Count Badge Later */}
                         </Link>
                        {/* Auth Links/Buttons */}
                        {token && user ? (
                            <>
                                {user.role === 'admin' && (
                                     <Link href="/admin/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light p-1 rounded-full" title="Admin Dashboard">
                                        <Cog6ToothIcon className="h-6 w-6" />
                                    </Link>
                                )}
                                <Link href="/profile" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light p-1 rounded-full" title="Your Profile">
                                    <span className="flex items-center">
                                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                                        <span className="hidden lg:inline text-sm ml-1">{user.username}</span> {/* Show on large screens */}
                                    </span>
                                 </Link>
                                <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" title="Logout" aria-label="Logout">
                                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                                </button>
                            </>
                        ) : (
                            <Link href="/auth/login" className="btn btn-secondary text-sm px-3 py-1.5">Login</Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                         {/* Mobile Search Icon (optional, could be inside menu) */}
                         {/* <button className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light p-1 rounded-full mr-2"> <MagnifyingGlassIcon className="h-6 w-6"/> </button> */}
                         {/* Mobile Cart Icon (shown if login/profile hidden) */}
                         {!(token && user) && (
                             <Link href="/cart" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light p-1 rounded-full relative mr-2" aria-label="View shopping cart">
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                             </Link>
                         )}
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Panel */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700" id="mobile-menu">
                    <div className="px-4 pt-4 pb-3 space-y-3">
                         {/* Mobile Search Form */}
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <label htmlFor="mobile-search" className="sr-only">Search products</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" aria-hidden="true" />
                                </div>
                                <input
                                    id="mobile-search"
                                    type="search"
                                    name="search-mobile"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search products..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                            <button type="submit" className="sr-only">Search</button>
                        </form>

                        {/* Mobile Links */}
                         <Link href="/" onClick={toggleMobileMenu} className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-base font-medium transition-colors">Home</Link>
                         <Link href="/#products" scroll={true} onClick={toggleMobileMenu} className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-base font-medium transition-colors">Products</Link>
                         {/* Add other links */}
                    </div>
                     {/* Mobile Auth Links */}
                     <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                         {token && user ? (
                            <div className="px-4 space-y-2">
                                <div className="flex items-center">
                                     <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400 mr-2"/>
                                     <div>
                                         <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.username}</div>
                                         <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                                     </div>
                                </div>
                                <Link href="/profile" onClick={toggleMobileMenu} className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-base font-medium transition-colors">Your Profile</Link>
                                {user.role === 'admin' && (
                                     <Link href="/admin/dashboard" onClick={toggleMobileMenu} className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-3 py-2 rounded-md text-base font-medium transition-colors">Admin Dashboard</Link>
                                )}
                                <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium transition-colors">
                                     Logout
                                </button>
                            </div>
                         ) : (
                             <div className="px-4">
                                 <Link href="/auth/login" onClick={toggleMobileMenu} className="block w-full text-center btn btn-primary">Login</Link>
                             </div>
                         )}
                     </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;