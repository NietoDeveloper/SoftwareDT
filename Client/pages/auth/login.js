// frontend/pages/auth/login.js
import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head'; // Import Head

export default function LoginPage() {
    const token = useAuthStore((state) => state.token);
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (token) {
            const redirectUrl = router.query.redirect || '/profile';
            router.replace(redirectUrl);
        }
    }, [token, router]);

    // Render loading/redirect message if token exists (prevents brief flash of form)
    if (token) {
         return (
             <>
                 <Head>
                    <title>Redirecting...</title>
                 </Head>
                 <div className="flex justify-center items-center min-h-screen">
                     <p>You are already logged in. Redirecting...</p>
                 </div>
             </>
         );
    }

    // Render login form if not logged in
    return (
         <>
            <Head>
                <title>Login - Your E-commerce App</title>
                 <meta name="description" content="Sign in to your account to access your profile, orders, and more." />
            </Head>
             {/* Centered container for the login form */}
             <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                 <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-xl">
                    <div className="text-center">
                        <div className="mx-auto flex justify-center mb-4">
                            {/* Ensure Logo component works */}
                            <Logo className="h-10 w-auto"/>
                        </div>
                         <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Sign in to your account
                        </h2>
                    </div>
                    {/* Ensure LoginForm component exists and works */}
                    <LoginForm />
                 </div>
             </div>
         </>
    );
}