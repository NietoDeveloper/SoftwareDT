// frontend/pages/auth/register.js
import RegisterForm from '@/components/auth/RegisterForm'; // Ensure this component exists
import Logo from '@/components/common/Logo'; // Ensure this component exists
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head'; // Import Head

export default function RegisterPage() {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (token) {
             const redirectUrl = router.query.redirect || '/profile'; // Or maybe '/'
            router.replace(redirectUrl);
        }
    }, [token, router]);

     // Prevent flash of register form if already logged in
     if (token) {
         return (
             <>
                 <Head><title>Redirecting...</title></Head>
                 <div className="flex justify-center items-center min-h-screen">
                     <p>You are already logged in. Redirecting...</p>
                 </div>
             </>
         );
     }

     // Render registration form
     return (
        <>
            <Head>
                <title>Create Account - Your E-commerce App</title>
                <meta name="description" content="Sign up for an account to start shopping." />
            </Head>
             <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                 <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-xl">
                    <div className="text-center">
                         <div className="mx-auto flex justify-center mb-4">
                            <Logo className="h-10 w-auto"/>
                        </div>
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Create your account
                        </h2>
                    </div>
                    {/* Ensure RegisterForm component exists */}
                    <RegisterForm />
                 </div>
             </div>
        </>
    );
}