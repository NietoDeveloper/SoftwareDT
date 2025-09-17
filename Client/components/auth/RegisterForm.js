// frontend/components/auth/RegisterForm.js
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const signup = useAuthStore((state) => state.register);
    const loading = useAuthStore((state) => state.loading);
    const authError = useAuthStore((state) => state.error);
    const [submitError, setSubmitError] = useState('');
    const router = useRouter();
    const password = watch('password'); // Watch password field for confirmation check

    const onSubmit = async (data) => {
        setSubmitError('');
        try {
            await signup(data.username, data.email, data.password);
            // Redirect after successful registration
            router.push('/profile'); // Or '/auth/login' if you want them to log in after registering
        } catch (error) {
            console.error("Registration Component Error:", error);
            setSubmitError(error || 'Registration failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(submitError || authError) && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{submitError || authError}</span>
                </div>
            )}
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="username"
                    type="text"
                    required
                    {...register('username', { required: 'Username is required' })}
                    className={`input-field ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' },
                    })}
                    className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                    })}
                    className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
               <input
                   id="confirmPassword"
                   type="password"
                   autoComplete="new-password"
                   required
                   {...register('confirmPassword', {
                       required: 'Please confirm your password',
                       validate: value => value === password || 'Passwords do not match'
                   })}
                   className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
               />
               {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
           </div>
            <div>
                <button type="submit" disabled={loading} className="w-full btn btn-primary disabled:opacity-70">
                    {loading ? 'Registering...' : 'Create Account'}
                </button>
            </div>
            <div className="text-sm text-center">
               <p className="text-gray-600">
                   Already have an account?{' '}
                   <Link href="/auth/login" legacyBehavior>
                       <a className="font-medium text-primary hover:text-primary-dark">Sign in</a>
                   </Link>
               </p>
           </div>
        </form>
    );
};

export default RegisterForm;