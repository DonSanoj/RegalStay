import { useAdminAuthStore } from '@/store/adminAuthStore';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
    const { admin } = useAdminAuthStore();

    useEffect(() => {
        document.title = `${admin?.admin_username}'s Admin Dashboard`;
    }, [admin]);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-green-500 mb-6">
                    Welcome, {admin?.admin_username}
                </h1>
                <div className="bg-gray-900 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
                    <p className="text-gray-300">Admin dashboard content will go here.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard