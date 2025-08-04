import React, { useEffect } from 'react'
import { useStaffAuthStore } from '@/store/staffAuthStore'

const ManagerDashboard = () => {
    const { staff, staffLogout } = useStaffAuthStore();

    useEffect(() => {
        document.title = `${staff?.staffMemberName}'s Manager Dashboard`;
    }, [staff]);

    const handleLogout = () => {
        staffLogout();
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-green-500">Manager Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Staff Information</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Name:</span> {staff?.staffMemberName}</p>
                            <p><span className="text-gray-400">Email:</span> {staff?.staffMemberEmail}</p>
                            <p><span className="text-gray-400">Role:</span> {staff?.role}</p>
                            <p><span className="text-gray-400">ID:</span> {staff?.staffMemberId}</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Quick Stats</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Total Rooms:</span> 210</p>
                            <p><span className="text-gray-400">Occupied:</span> 145</p>
                            <p><span className="text-gray-400">Available:</span> 65</p>
                            <p><span className="text-gray-400">Staff Members:</span> 25</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Today's Tasks</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Pending Approvals:</span> 5</p>
                            <p><span className="text-gray-400">Staff Meetings:</span> 2</p>
                            <p><span className="text-gray-400">Reports Due:</span> 3</p>
                            <p><span className="text-gray-400">Inspections:</span> 4</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Manager Controls</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            Staff Management
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            Room Management
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            Reports & Analytics
                        </button>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                            Guest Services
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerDashboard