"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteUsersPage = () => {
    const [userList, setUserList] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/get-users');
                const data = await response.json();
                setUserList(data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        try {
            const response = await fetch('/api/delete-user', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            const result = await response.json();
            
            if (result.success) {
                setUserList(userList.filter(user => user.id !== userId));
                toast.success('User deleted successfully!');
            } else {
                toast.error(result.error || 'Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    return (
        <div className="mt-20 px-4">
            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>
            <div className="flex justify-center">
                <div className="overflow-x-auto w-full max-w-2xl">
                    <table className="min-w-full border border-gray-400 rounded-lg shadow-md">
                        <thead className="bg-blue-400">
                            <tr>
                                <th className="py-3 px-6 border-b text-left">Email</th>
                                <th className="py-3 px-6 border-b text-left">Role</th>
                                <th className="py-3 px-6 border-b text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(user => (
                                <tr key={user.id} className="hover:bg-gray-400">
                                    <td className="py-3 px-6 border-b">{user.email}</td>
                                    <td className="py-3 px-6 border-b">{user.schoolRole}</td>
                                    <td className="py-3 px-6 border-b text-center">
                                        <Button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeleteUsersPage;
