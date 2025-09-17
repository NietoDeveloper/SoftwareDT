// frontend/components/common/Input.js
import React from 'react';

const Input = ({
    label,
    name,
    type = 'text',
    placeholder,
    register, // Pass react-hook-form register function
    error, // Pass error message object/string
    required = false,
    className = '',
    labelClassName = '',
    inputClassName = '',
    ...props // Other input attributes (value, onChange if not using react-hook-form)
}) => {
    const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary focus:border-primary';
    const baseInputClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm';

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={name} className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required} // HTML5 required attribute
                {...(register ? register(name, { required: required ? `${label || 'This field'} is required` : false }) : {})} // Conditionally apply react-hook-form register
                className={`${baseInputClasses} ${errorClasses} ${inputClassName}`}
                {...props} // Spread other props
            />
            {error && <p className="mt-1 text-xs text-red-600">{error.message || error}</p>}
        </div>
    );
};

export default Input;