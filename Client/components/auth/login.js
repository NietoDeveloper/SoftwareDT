// frontend/pages/auth/login.js
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import Logo from '@/components/common/Logo';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LoginPage() {
    const { token } = useAuthStore();
    const router = useRouter();

    // If user is already logged in, redirect them
    useEffect(() => {
        if (token) {
            router.push('/profile'); // Redirect to profile or dashboard
        }
    }, [token, router]);


     return (
         // Using a simpler layout for auth pages, or reuse main Layout
         // For simplicity, reusing main Layout
         <Layout title="Login">
             <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"> {/* Adjust min-height based on navbar/footer */}
                 <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-lg shadow-lg">
                    <div>
                        <div className="mx-auto flex justify-center">
                            <Logo className="h-12 w-auto"/>
                        </div>
                         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <LoginForm />
                 </div>
             </div>
         </Layout>
     );
}

// Optional: Prevent this page from rendering if already logged in via server-side check
// import { checkAuthAndRedirect } from '@/utils/authHelpers'; // Example helper
// export async function getServerSideProps(context) {
//    return checkAuthAndRedirect(context, '/profile'); // Redirect if logged in
// }