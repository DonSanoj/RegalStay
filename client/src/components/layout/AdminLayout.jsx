import React, { useEffect } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AdminHeader } from '../includes/admin/AdminHeader'
import { AdminSidebar } from '../includes/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
    useEffect(() => {
        // Add dark mode class when AdminLayout mounts
        document.documentElement.classList.add('dark');
        
        // Optional: Remove dark mode when component unmounts
        return () => {
            // document.documentElement.classList.remove('dark');
        };
    }, []);

    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <AdminHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AdminLayout