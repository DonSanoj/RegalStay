import React, { useEffect } from 'react'
import { useStaffAuthStore } from '@/store/staffAuthStore'

const HousekeeperDashboard = () => {
    const { staff, staffLogout } = useStaffAuthStore();

    useEffect(() => {
        document.title = `${staff?.staffMemberName}'s Housekeeper Dashboard`;
    }, [staff]);

    const handleLogout = () => {
        staffLogout();
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-green-500">Housekeeper Dashboard</h1>
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
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Today's Tasks</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">Rooms to Clean:</span> 18</p>
                            <p><span className="text-gray-400">Completed:</span> 12</p>
                            <p><span className="text-gray-400">In Progress:</span> 3</p>
                            <p><span className="text-gray-400">Pending:</span> 3</p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Maintenance Requests</h3>
                        <div className="space-y-2">
                            <p><span className="text-gray-400">New Requests:</span> 5</p>
                            <p><span className="text-gray-400">In Progress:</span> 3</p>
                            <p><span className="text-gray-400">Completed Today:</span> 8</p>
                            <p><span className="text-gray-400">High Priority:</span> 2</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Room Status Updates</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                                <span>Room 201</span>
                                <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                                    Mark Clean
                                </button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                                <span>Room 205</span>
                                <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm">
                                    In Progress
                                </button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                                <span>Room 210</span>
                                <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                                    Maintenance Required
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Start Room Cleaning
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Report Maintenance
                            </button>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Inventory Check
                            </button>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                Break Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HousekeeperDashboard