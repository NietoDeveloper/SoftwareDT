// frontend/components/admin/ProductForm.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input'; // Reusable Input
import Button from '@/components/common/Button'; // Reusable Button

const ProductForm = ({ product, onSubmit, onCancel, loading }) => {
    // product prop is optional (null/undefined for Add, object for Edit)
    const isEditing = !!product; // Check if we are editing

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { // Set default values based on product prop
            name: '',
            description: '',
            price: '',
            stock: '',
            image_url: '',
            ...product, // Spread existing product values if editing
        }
    });

    // Reset form if the product prop changes (e.g., switching from add to edit)
    useEffect(() => {
        if (product) {
            reset(product); // Reset form with product data when editing
        } else {
            reset({ name: '', description: '', price: '', stock: '', image_url: '' }); // Reset to empty for adding
        }
    }, [product, reset]);

    const handleFormSubmit = (data) => {
        // Convert price and stock to numbers before submitting
        const processedData = {
            ...data,
            price: parseFloat(data.price),
            stock: parseInt(data.stock, 10)
        };
        onSubmit(processedData); // Call the handler passed via props
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
                label="Product Name"
                name="name"
                register={register}
                required={true}
                error={errors.name}
                placeholder="e.g., Modern Coffee Table"
            />
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    {...register('description')} // No strict validation needed usually
                    className={`input-field ${errors.description ? 'border-red-500' : ''} block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm`}
                    placeholder="Detailed description of the product..."
                ></textarea>
                 {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Price ($)"
                    name="price"
                    type="number"
                    step="0.01" // Allow decimals
                    register={register}
                    required={true}
                    validation={{
                         valueAsNumber: true,
                         required: 'Price is required',
                         min: { value: 0.01, message: 'Price must be positive' }
                     }}
                    error={errors.price}
                    placeholder="e.g., 99.99"
                />
                <Input
                    label="Stock Quantity"
                    name="stock"
                    type="number"
                    step="1" // Whole numbers
                     register={register}
                     required={true}
                     validation={{
                         valueAsNumber: true,
                         required: 'Stock is required',
                         min: { value: 0, message: 'Stock cannot be negative' },
                         validate: value => Number.isInteger(value) || 'Stock must be a whole number'
                     }}
                    error={errors.stock}
                    placeholder="e.g., 50"
                />
            </div>
            <Input
                label="Image URL"
                name="image_url"
                type="url" // Use URL type for basic validation
                register={register}
                // Not strictly required, but good practice
                validation={{
                     pattern: {
                         value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                         message: 'Please enter a valid URL (http:// or https://)'
                     }
                 }}
                error={errors.image_url}
                placeholder="https://your-image-host.com/image.jpg"
            />
            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" loading={loading} disabled={loading}>
                    {isEditing ? 'Update Product' : 'Add Product'}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;