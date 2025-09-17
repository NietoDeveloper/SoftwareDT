// frontend/pages/admin/products.js
import withAdminAuth from '@/components/auth/withAdminAuth';
import Head from 'next/head';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal'; // Assuming Modal component exists
import ProductForm from '@/components/admin/ProductForm'; // Assuming ProductForm exists
import AdminProductList from '@/components/admin/AdminProductList'; // Assuming AdminProductList exists
import api from '@/lib/api';
import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // null for Add, product object for Edit
    const [formLoading, setFormLoading] = useState(false); // Loading state for form submission

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // No admin prefix needed if using regular product routes with admin check
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError(err.message || 'Could not load products.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Handlers for Modal and Form
    const handleOpenAddModal = () => {
        setEditingProduct(null); // Ensure we are in "Add" mode
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product); // Set the product to edit
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null); // Clear editing state
    };

    const handleFormSubmit = async (formData) => {
        setFormLoading(true);
        setError(null); // Clear previous form errors
        const isEditing = !!editingProduct;
        const url = isEditing ? `/products/${editingProduct.id}` : '/products';
        const method = isEditing ? 'put' : 'post';

        try {
             console.log(`Submitting product (${method.toUpperCase()}):`, formData);
            const response = await api[method](url, formData);
             console.log("Product submit response:", response.data);
            await fetchProducts(); // Refresh product list
            handleCloseModal(); // Close modal on success
             // TODO: Add success toast notification
        } catch (err) {
            console.error(`Failed to ${isEditing ? 'update' : 'add'} product:`, err);
            setError(err.message || `Could not ${isEditing ? 'update' : 'add'} product.`);
             // TODO: Add error toast notification
        } finally {
            setFormLoading(false);
        }
    };

     // Handler for Delete
     const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product? This action may fail if the product is part of existing orders.')) {
            setLoading(true); // Use main loading state or a specific delete loading state
            setError(null);
            try {
                 console.log(`Deleting product ${productId}`);
                await api.delete(`/products/${productId}`); // Admin middleware handles access
                 console.log(`Product ${productId} deleted.`);
                await fetchProducts(); // Refresh list
                 // TODO: Add success toast
            } catch (err) {
                console.error(`Failed to delete product ${productId}:`, err);
                setError(err.message || 'Could not delete product.');
                 // TODO: Add error toast
                 setLoading(false); // Ensure loading is unset on error
            }
            // setLoading(false); // Loading should be unset by fetchProducts() call
        }
    };


      return (
        <>
            <Head>
                <title>Manage Products - Admin</title>
            </Head>
            <div className="container mx-auto px-4 py-8">
                {/* Header and Add Button */}
                <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Products</h1>
                    <Button variant="primary" onClick={handleOpenAddModal}>
                        <PlusIcon className="h-5 w-5 mr-2"/>
                        Add New Product
                    </Button>
                </div>

                {/* Display Error Messages */}
                {error && (
                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                         <strong className="font-bold">Error: </strong>
                         <span className="block sm:inline">{error}</span>
                     </div>
                )}

                {/* Product List Table */}
                <AdminProductList
                    products={products}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteProduct}
                    loading={loading}
                />

                {/* Add/Edit Product Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={editingProduct ? 'Edit Product' : 'Add New Product'}
                >
                    <ProductForm
                        product={editingProduct}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCloseModal}
                        loading={formLoading}
                    />
                </Modal>

            </div>
        </>
      );
};

// Protect this page - requires admin role
export default withAdminAuth(AdminProductsPage);