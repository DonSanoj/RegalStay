import { useAdminAuthStore } from '@/store/adminAuthStore';
import { Button } from '@/components/ui/button';
import { SectionCards } from '@/components/includes/admin/section-cards';
import { ChartAreaInteractive } from '@/components/includes/admin/chart-area-interactive';
import { DataTable } from '@/components/includes/admin/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
    const { admin } = useAdminAuthStore();

    useEffect(() => {
        document.title = `${admin?.admin_username}'s Dashboard`;
    }, [admin]);

    // Sample hotel management data for the data table
    const hotelManagementData = [
        {
            id: 1,
            header: "Room 101 - Deluxe Suite",
            type: "Accommodation",
            status: "Done",
            target: "2",
            limit: "2",
            reviewer: "Sarah Johnson"
        },
        {
            id: 2,
            header: "Guest Check-in Process",
            type: "Operations",
            status: "In Process",
            target: "15",
            limit: "20",
            reviewer: "Mike Davis"
        },
        {
            id: 3,
            header: "Housekeeping Schedule",
            type: "Maintenance",
            status: "Done",
            target: "8",
            limit: "10",
            reviewer: "Lisa Chen"
        },
        {
            id: 4,
            header: "Restaurant Reservations",
            type: "Dining",
            status: "In Process",
            target: "25",
            limit: "30",
            reviewer: "James Wilson"
        },
        {
            id: 5,
            header: "Event Hall Booking",
            type: "Events",
            status: "Done",
            target: "5",
            limit: "8",
            reviewer: "Emily Brown"
        },
        {
            id: 6,
            header: "Spa Appointments",
            type: "Wellness",
            status: "In Process",
            target: "12",
            limit: "15",
            reviewer: "David Miller"
        },
        {
            id: 7,
            header: "Valet Parking Service",
            type: "Services",
            status: "Done",
            target: "20",
            limit: "25",
            reviewer: "Anna Taylor"
        }
    ];

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-8">

            {/* Stats Cards */}
            <SectionCards />

            {/* Charts and Analytics */}
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {/* Chart Component */}
                <div className="xl:col-span-2">
                    <ChartAreaInteractive />
                </div>

                {/* Admin Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Profile</CardTitle>
                        <CardDescription>Your account information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Username</p>
                            <p className="text-sm text-muted-foreground">{admin?.admin_username}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{admin?.admin_email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Role</p>
                            <p className="text-sm text-muted-foreground">{admin?.admin_role}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Admin ID</p>
                            <p className="text-sm text-muted-foreground">{admin?.admin_id}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Hotel Operations Management</CardTitle>
                        <CardDescription>
                            Manage room assignments, bookings, and service operations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable data={hotelManagementData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminDashboard