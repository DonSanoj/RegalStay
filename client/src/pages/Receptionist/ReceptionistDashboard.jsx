import React, { useEffect } from 'react'
import { useStaffAuthStore } from '@/store/staffAuthStore'

const ReceptionistDashboard = () => {
    const { staff, staffLogout } = useStaffAuthStore();

    useEffect(() => {
        document.title = `${staff?.staffMemberName}'s Receptionist Dashboard`;
    }, [staff]);

    const handleLogout = () => {
        staffLogout();
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-green-500">Receptionist Dashboard</h1>
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
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Today's Check-ins</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Scheduled:</span> 28</p>
                            <p><span className="text-gray-400">Completed:</span> 15</p>
                            <p><span className="text-gray-400">Pending:</span> 13</p>
                            <p><span className="text-gray-400">Late Arrivals:</span> 3</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Today's Check-outs</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Scheduled:</span> 22</p>
                            <p><span className="text-gray-400">Completed:</span> 18</p>
                            <p><span className="text-gray-400">Pending:</span> 4</p>
                            <p><span className="text-gray-400">Extended Stays:</span> 2</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                New Check-in
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Process Check-out
                            </button>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Room Status
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Guest Services
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Room Availability</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Standard Rooms</span>
                                <span className="text-green-400">25 Available</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Deluxe Rooms</span>
                                <span className="text-yellow-400">8 Available</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Suites</span>
                                <span className="text-red-400">2 Available</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Presidential Suite</span>
                                <span className="text-red-400">Occupied</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceptionistDashboard