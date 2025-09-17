// frontend/pages/admin/users.js
import withAdminAuth from '@/components/auth/withAdminAuth'; // Use the specific admin HOC
import Head from 'next/head'; // Import Head
import UserList from '@/components/admin/UserList'; // Use the UserList component

const AdminUsersPage = () => {
  // UserList component handles fetching and displaying users
  return (
    <>
        <Head>
            <title>Manage Users - Admin</title>
             <meta name="description" content="View and manage user accounts." />
        </Head>
         <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Users</h1>
                 {/* Optional: Add button or functionality if needed */}
                 {/* <Button>Add User Manually</Button> */}
            </div>

            {/* Render the UserList component */}
            <UserList />

          </div>
    </>
  );
};

// Protect this page - requires admin role
export default withAdminAuth(AdminUsersPage);