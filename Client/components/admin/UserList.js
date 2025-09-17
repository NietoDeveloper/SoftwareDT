// frontend/components/admin/UserList.js
import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import Button from '@/components/common/Button';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'; // Example icons

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/admin/users'); // Use your API helper
            setUsers(response.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError(err.message || 'Could not load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

     const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                // Refresh list after delete
                setUsers(users.filter(user => user.id !== userId));
                 // Add success feedback (e.g., toast)
                 console.log(`User ${userId} deleted.`);
            } catch (err) {
                 console.error(`Failed to delete user ${userId}:`, err);
                 // Add error feedback (e.g., toast)
                 alert(`Error deleting user: ${err.message || 'Please try again.'}`);
            }
        }
    };

    // TODO: Implement Edit User functionality (e.g., open a modal to change role)
    const handleEdit = (user) => {
         console.log("Edit user:", user);
         alert("Edit functionality not implemented yet.");
    };

    if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;
     if (users.length === 0) return <p className="text-center text-gray-500">No users found.</p>;

    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                {/* Edit Button - Placeholder */}
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={() => handleEdit(user)}
                                    aria-label={`Edit ${user.username}`}
                                    className="p-1"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </Button>
                                 {/* Delete Button */}
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={() => handleDelete(user.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                     aria-label={`Delete ${user.username}`}
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

export default UserList;