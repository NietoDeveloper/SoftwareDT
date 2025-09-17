// frontend/pages/profile.js
import { useAuthStore } from '@/store/authStore';
import withAuth from '@/components/auth/withAuth'; // Import HOC for protection
import Head from 'next/head'; // Import Head
import { useEffect } from 'react'; // Keep useEffect if needed for logging or other actions

const ProfilePage = () => {
    const user = useAuthStore((state) => state.user);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    useEffect(() => {
      console.log("ProfilePage Effect - State Update:", { loading, user: !!user, error });
    }, [loading, user, error]);

    // Loading state (primarily handled by withAuth, but provides fallback UI)
    if (loading && !user) {
         return (
             <>
                 <Head>
                     <title>Loading Profile...</title>
                 </Head>
                 <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                     <p className="text-gray-500 dark:text-gray-400">Loading profile data...</p>
                 </div>
             </>
         );
     }

    // Error state / User not found (should ideally be handled by withAuth redirect)
    if (!user) {
        return (
            <>
                <Head>
                    <title>Profile Unavailable</title>
                </Head>
                <div className="text-center py-10">
                    <h1 className="text-2xl font-semibold text-red-600 mb-4">Profile Unavailable</h1>
                    <p className="text-gray-600 dark:text-gray-300">Could not load user profile data. You might not be logged in.</p>
                </div>
             </>
        );
    }

    // Render profile content
    return (
        <>
            <Head>
                <title>{`${user.username}'s Profile - Your E-commerce App`}</title>
                <meta name="description" content={`View and manage your profile information, ${user.username}.`} />
            </Head>
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 border-b pb-4 dark:text-gray-100 dark:border-gray-700">My Profile</h1>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 space-y-5">
                    {/* Display potential errors */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{typeof error === 'string' ? error : JSON.stringify(error)}</span>
                        </div>
                    )}

                     <div className="flex flex-col sm:flex-row sm:items-center">
                         <span className="font-semibold text-gray-700 dark:text-gray-300 w-32 mb-1 sm:mb-0">Username:</span>
                         <p className="text-gray-900 dark:text-gray-100 break-words">{user.username}</p>
                     </div>
                      <div className="flex flex-col sm:flex-row sm:items-center">
                         <span className="font-semibold text-gray-700 dark:text-gray-300 w-32 mb-1 sm:mb-0">Email:</span>
                         <p className="text-gray-900 dark:text-gray-100 break-words">{user.email}</p>
                     </div>
                     <div className="flex flex-col sm:flex-row sm:items-center">
                         <span className="font-semibold text-gray-700 dark:text-gray-300 w-32 mb-1 sm:mb-0">Role:</span>
                         <p className="text-gray-900 dark:text-gray-100 capitalize px-3 py-1 inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                             {user.role}
                         </p>
                     </div>
                     {/* Display Join Date */}
                     {user.created_at && (
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <span className="font-semibold text-gray-700 dark:text-gray-300 w-32 mb-1 sm:mb-0">Member Since:</span>
                            <p className="text-gray-900 dark:text-gray-100">{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                     )}
                     {/* Placeholder for actions */}
                     <div className="border-t dark:border-gray-700 pt-6 mt-6 space-x-3">
                         <p className="text-sm text-gray-500 dark:text-gray-400">More actions coming soon...</p>
                     </div>
                 </div>
             </div>
        </>
    );
};

// Wrap with withAuth HOC
export default withAuth(ProfilePage);