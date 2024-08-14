"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ManageRolesPage = () => {
    const [userList, setUserList] = useState<any[]>([]);
    const [roleMap, setRoleMap] = useState<{ [key: string]: string }>({}); // To store user id and selected roles

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/get-users');
                const data = await response.json();
                setUserList(data.users);
                // Initialize roleMap with current roles
                const initialRoleMap = data.users.reduce((map: { [key: string]: string }, user: any) => {
                    map[user.id] = user.schoolRole;
                    return map;
                }, {});
                setRoleMap(initialRoleMap);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!newRole) return;

        try {
            const response = await fetch('/api/update-user-role', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole }),
            });
            const result = await response.json();
            
            if (result.success) {
                setUserList(userList.map(user =>
                    user.id === userId ? { ...user, schoolRole: newRole } : user
                ));
                setRoleMap({ ...roleMap, [userId]: newRole });
            } else {
                alert(result.error || 'Error updating role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            alert('Error updating role');
        }
    };

    return (
        <div className="mt-20 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Manage User Roles</h1>
            <div className="flex justify-center">
                <div className="overflow-x-auto w-full max-w-2xl">
                    <table className="min-w-full border border-gray-400 rounded-lg shadow-md">
                        <thead className="bg-blue-400">
                            <tr>
                                <th className="py-3 px-6 border-b text-left">Email</th>
                                <th className="py-3 px-6 border-b text-left">Current Role</th>
                                <th className="py-3 px-6 border-b text-left">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(user => (
                                <tr key={user.id} className="hover:bg-gray-400">
                                    <td className="py-3 px-6 border-b">{user.email}</td>
                                    <td className="py-3 px-6 border-b">{roleMap[user.id]}</td>
                                    <td className="py-3 px-6 border-b">
                                        <select
                                            value={roleMap[user.id] || ''}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="mr-2 bg-white text-center text-black border border-gray-400"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Student">Student</option>
                                            <option value="Educator">Educator</option>
                                            <option value="Manager">Manager</option>
                                        </select>
                                        <Button
                                            onClick={() => handleRoleChange(user.id, roleMap[user.id])}
                                            className="ml-4 mt-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                                        >
                                            Update
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

export default ManageRolesPage;
