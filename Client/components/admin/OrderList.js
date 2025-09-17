// frontend/components/admin/OrderList.js
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Button from '@/components/common/Button';
import { EyeIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'; // Example icons
import Link from 'next/link';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            // Admin route to get all orders
            const response = await api.get('/orders'); // Backend uses protect + admin middleware
            setOrders(response.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            setError(err.message || 'Could not load orders.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

     // TODO: Implement functionality to update order status
     const handleUpdateStatus = async (orderId, newStatus) => {
         console.log(`Update order ${orderId} to ${newStatus}`);
         // Add API call here: api.put(`/api/orders/${orderId}/status`, { status: newStatus })
         // Refresh orders list or update state locally on success
         alert("Status update functionality not fully implemented yet.");
     };

    if (loading) return <p className="text-center text-gray-500">Loading orders...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
    if (orders.length === 0) return <p className="text-center text-gray-500">No orders found.</p>;

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.email || order.username || `User ID: ${order.user_id}`} {/* Display email/username if joined */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${parseFloat(order.total_amount).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800' // pending
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                 {/* View Order Details */}
                                 <Link href={`/orders/${order.id}`} passHref legacyBehavior>
                                      <Button as="a" size="sm" variant="link" className="p-1" aria-label={`View order ${order.id}`}>
                                          <EyeIcon className="h-4 w-4"/>
                                      </Button>
                                 </Link>
                                {/* Example: Mark as Shipped Button */}
                                 {order.status === 'processing' && (
                                     <Button
                                         size="sm"
                                         variant="link"
                                         onClick={() => handleUpdateStatus(order.id, 'shipped')}
                                         className="text-blue-600 hover:text-blue-800 p-1"
                                         aria-label={`Mark order ${order.id} as shipped`}
                                         title="Mark as Shipped"
                                     >
                                        <TruckIcon className="h-4 w-4"/>
                                     </Button>
                                 )}
                                 {/* Example: Mark as Delivered Button */}
                                 {order.status === 'shipped' && (
                                     <Button
                                         size="sm"
                                         variant="link"
                                         onClick={() => handleUpdateStatus(order.id, 'delivered')}
                                         className="text-green-600 hover:text-green-800 p-1"
                                         aria-label={`Mark order ${order.id} as delivered`}
                                          title="Mark as Delivered"
                                     >
                                        <CheckCircleIcon className="h-4 w-4"/>
                                     </Button>
                                 )}
                                 {/* Add buttons for other status changes as needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;