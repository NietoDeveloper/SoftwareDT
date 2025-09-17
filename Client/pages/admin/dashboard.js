// frontend/pages/admin/dashboard.js
import withAdminAuth from '@/components/auth/withAdminAuth'; // Use the specific admin HOC
import Link from 'next/link';
import Head from 'next/head'; // Import Head
import { ChartBarIcon, ShoppingBagIcon, UsersIcon } from '@heroicons/react/24/outline'; // Example Icons

const AdminDashboard = () => {
  // TODO: Fetch admin-specific data here (e.g., API calls for stats)
  // Example placeholder stats
  const stats = {
      totalProducts: 125,
      pendingOrders: 15,
      totalUsers: 580,
      monthlyRevenue: 12345.67 // Example
  };

  return (
    <>
        <Head>
            <title>Admin Dashboard - Your E-commerce App</title>
            <meta name="description" content="Manage products, orders, users, and view statistics." />
        </Head>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
               {/* Example Stats Card */}
               <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                 <ShoppingBagIcon className="h-10 w-10 text-blue-500"/>
                 <div>
                     <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</h2>
                     <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalProducts}</p>
                 </div>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                  <ChartBarIcon className="h-10 w-10 text-yellow-500"/>
                 <div>
                     <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</h2>
                     <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pendingOrders}</p>
                 </div>
               </div>
               <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                  <UsersIcon className="h-10 w-10 text-green-500"/>
                 <div>
                     <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h2>
                     <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers}</p>
                 </div>
               </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
                   <span className="text-3xl font-bold text-purple-500">$</span> {/* Simple dollar icon */}
                 <div>
                     <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue (Month)</h2>
                     <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${stats.monthlyRevenue.toFixed(2)}</p>
                 </div>
               </div>
            </div>

            {/* Management Links Section */}
            <div>
               <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Management Areas</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <Link href="/admin/products" className="block p-6 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition duration-150 text-blue-800 dark:text-blue-200 font-medium text-center">
                         Manage Products
                   </Link>
                   <Link href="/admin/orders" className="block p-6 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded-lg transition duration-150 text-yellow-800 dark:text-yellow-200 font-medium text-center">
                         Manage Orders
                   </Link>
                    <Link href="/admin/users" className="block p-6 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition duration-150 text-green-800 dark:text-green-200 font-medium text-center">
                         Manage Users
                   </Link>
               </div>
            </div>
          </div>
    </>
  );
};

// Protect this page - requires admin role
export default withAdminAuth(AdminDashboard);