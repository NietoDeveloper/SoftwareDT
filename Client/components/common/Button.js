// frontend/components/common/Button.js
import React from 'react';

// Example Button component - customize variants and sizes as needed
const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary', // e.g., primary, secondary, danger, link
    size = 'md', // e.g., sm, md, lg
    disabled = false,
    loading = false,
    className = '', // Allow custom classes
    ...props // Pass other props like aria-label, etc.
}) => {
    // Base styles (can be moved to @layer components in globals.css)
    const baseStyles = 'inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out';

    // Variant styles
    const variantStyles = {
        primary: 'border-transparent text-white bg-primary hover:bg-primary-dark focus:ring-primary disabled:bg-primary/70',
        secondary: 'border-primary text-primary bg-primary-light hover:bg-cyan-200 focus:ring-primary disabled:bg-primary-light/70 disabled:text-primary/70',
        danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-500/70',
        link: 'border-transparent text-primary hover:text-primary-dark underline focus:ring-primary disabled:text-gray-400',
        outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400'
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const combinedClassName = `
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${disabled || loading ? 'opacity-75 cursor-not-allowed' : ''}
        ${className}
    `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={combinedClassName.trim().replace(/\s+/g, ' ')} // Clean up whitespace
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;