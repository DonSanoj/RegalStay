import { useAdminAuthStore } from '@/store/adminAuthStore';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
    const { admin, adminLogout } = useAdminAuthStore();

    useEffect(() => {
        document.title = `${admin?.admin_username}'s Admin Dashboard`;
    }, [admin]);

    const handleLogout = () => {
        adminLogout();
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-green-500">
                        Welcome, {admin?.admin_username}
                    </h1>
                    <Button 
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Logout
                    </Button>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-green-400 mb-2">Admin Info</h3>
                            <p className="text-gray-300">Email: {admin?.admin_email}</p>
                            <p className="text-gray-300">Role: {admin?.admin_role}</p>
                            <p className="text-gray-300">ID: {admin?.admin_id}</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-green-400 mb-2">System Management</h3>
                            <p className="text-gray-300">Manage users, settings, and system configurations.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-green-400 mb-2">Reports</h3>
                            <p className="text-gray-300">View system reports and analytics.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard