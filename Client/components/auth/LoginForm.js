// frontend/components/auth/LoginForm.js
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const authError = useAuthStore((state) => state.error);
    const [submitError, setSubmitError] = useState(''); // Component-level error
    const router = useRouter();

    const onSubmit = async (data) => {
        setSubmitError(''); // Clear previous errors
        try {
            await login(data.email, data.password);
            // Redirect on successful login (Zustand state update will trigger UI changes)
            // Check for redirect query param or default to profile/dashboard
            const redirectUrl = router.query.redirect || '/profile';
            router.push(redirectUrl);
        } catch (error) {
             // Error is already logged in authStore, set component error for display
             console.error("Login Component Error:", error);
             setSubmitError(error || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Display component-level or Zustand errors */}
            {(submitError || authError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{submitError || authError}</span>
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match email format',
                            },
                        })}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                         className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                </div>
            </div>
            <div className="flex items-center justify-between">
               {/* Keep me logged in (requires more implementation) */}
               {/* <div className="flex items-center"> ... </div> */}
               <div className="text-sm">
                   <Link href="/auth/forgot-password" legacyBehavior>
                      <a className="font-medium text-primary hover:text-primary-dark">Forgot your password?</a>
                   </Link>
               </div>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary disabled:opacity-70"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </div>
            <div className="text-sm text-center">
               <p className="text-gray-600">
                   Don&apos;t have an account?{' '}
                   <Link href="/auth/register" legacyBehavior>
                       <a className="font-medium text-primary hover:text-primary-dark">Sign up</a>
                   </Link>
               </p>
           </div>
        </form>
    );
};

export default LoginForm;