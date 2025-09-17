// frontend/pages/admin/orders.js
import withAdminAuth from '@/components/auth/withAdminAuth'; // Use the specific admin HOC
import Head from 'next/head'; // Import Head
import OrderList from '@/components/admin/OrderList'; // Use the OrderList component

const AdminOrdersPage = () => {
  // OrderList component handles fetching and displaying orders
  return (
    <>
        <Head>
            <title>Manage Orders - Admin</title>
             <meta name="description" content="View and manage customer orders." />
        </Head>
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Orders</h1>
                {/* Optional: Add filtering or actions */}
                {/* <Button>Filter Orders</Button> */}
            </div>

            {/* Render the OrderList component */}
            <OrderList />

          </div>
    </>
  );
};

// Protect this page - requires admin role
export default withAdminAuth(AdminOrdersPage);