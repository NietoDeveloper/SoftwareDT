// frontend/components/admin/AdminProductList.js
import React from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const AdminProductList = ({ products = [], onEdit, onDelete, loading }) => {

    if (loading) return <p className="text-center text-gray-500 py-4">Loading products...</p>;
    if (!products || products.length === 0) return <p className="text-center text-gray-500 py-4">No products found.</p>;

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Image</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                 <div className="w-10 h-10 relative flex-shrink-0">
                                     <Image
                                         src={product.image_url || '/placeholder-image.png'}
                                         alt={product.name || 'Product'}
                                         layout="fill"
                                         objectFit="cover"
                                         className="rounded"
                                         onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                                     />
                                 </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock ?? 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                 {/* Edit Button */}
                                 <Button
                                    size="sm"
                                    variant="link"
                                    onClick={() => onEdit(product)} // Pass product data to edit handler
                                    aria-label={`Edit ${product.name}`}
                                    className="p-1"
                                 >
                                     <PencilIcon className="h-4 w-4" />
                                 </Button>
                                 {/* Delete Button */}
                                 <Button
                                     size="sm"
                                     variant="link"
                                     onClick={() => onDelete(product.id)} // Pass ID to delete handler
                                     className="text-red-600 hover:text-red-800 p-1"
                                     aria-label={`Delete ${product.name}`}
                                 >
                                    <TrashIcon className="h-4 w-4"/>
                                 </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;