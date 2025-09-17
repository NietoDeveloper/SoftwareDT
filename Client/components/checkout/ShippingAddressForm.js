// frontend/components/checkout/ShippingAddressForm.js
import React from 'react';
// Import useFormContext to access form methods from the parent FormProvider
import { useFormContext } from 'react-hook-form';
import Input from '@/components/common/Input'; // Your reusable Input component

/**
 * Renders the input fields for a shipping address form.
 * Relies on react-hook-form context provided by a parent <FormProvider>.
 */
const ShippingAddressForm = () => {
    // Get methods (register, formState) from the parent FormProvider context
    const { register, formState: { errors } } = useFormContext();

    // No local submit handler needed; validation/submission handled by parent form

    return (
        // Renders just the fields within a div container for spacing
        <div className="space-y-4">
            {/* Each Input uses register and errors from the parent form context */}
            <Input
                label="Full Name"
                name="fullName" // This name must be unique within the parent form
                register={register} // Pass register function from context
                required={true}
                error={errors.fullName} // Access errors from context
                placeholder="Enter your full name"
                autoComplete="name"
                // Add validation rules directly here
                validation={{ required: 'Full name is required' }}
            />

            <Input
                label="Address Line 1"
                name="address1"
                register={register}
                required={true}
                error={errors.address1}
                placeholder="Street address, P.O. box, etc."
                autoComplete="address-line1"
                validation={{ required: 'Street address is required' }}
            />

            <Input
                label="Address Line 2"
                name="address2"
                register={register}
                // required={false} // Default for Input component unless specified
                error={errors.address2}
                placeholder="Apartment, suite, unit, etc. (Optional)"
                autoComplete="address-line2"
            />

            {/* Layout city, state, zip in a responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                    label="City"
                    name="city"
                    register={register}
                    required={true}
                    error={errors.city}
                    placeholder="Enter city"
                    autoComplete="address-level2"
                    validation={{ required: 'City is required' }}
                    className="sm:col-span-1" // Example grid column span
                />
                <Input
                    label="State / Province"
                    name="state"
                    register={register}
                    required={true}
                    error={errors.state}
                    placeholder="Enter state/province"
                    autoComplete="address-level1"
                    validation={{ required: 'State/Province is required' }}
                    className="sm:col-span-1"
                />
                 <Input
                    label="ZIP / Postal Code"
                    name="postalCode"
                    register={register}
                    required={true}
                    error={errors.postalCode}
                    placeholder="Enter ZIP/postal code"
                    autoComplete="postal-code"
                    validation={{ required: 'Postal code is required' }}
                    className="sm:col-span-1"
                />
            </div>

             {/* Country Input - Consider using a <select> for better UX */}
             <Input
                label="Country"
                name="country"
                register={register}
                required={true}
                error={errors.country}
                placeholder="Enter country"
                autoComplete="country-name"
                validation={{ required: 'Country is required' }}
             />

            {/* Phone Input */}
            <Input
                label="Phone Number"
                name="phone"
                type="tel" // Use 'tel' type
                register={register}
                required={true} // Often required for shipping carriers
                error={errors.phone}
                placeholder="Enter phone number"
                autoComplete="tel"
                 validation={{
                     required: 'Phone number is required for delivery updates',
                     // Optional: Add pattern validation if needed
                     // pattern: { value: /^[0-9\-\+\s\(\)]+$/, message: 'Invalid phone number format'}
                 }}
            />
        </div>
    );
};

export default ShippingAddressForm;