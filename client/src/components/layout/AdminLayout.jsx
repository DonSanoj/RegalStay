import React from 'react'
import AdminHeader from '../includes/AdminHeader'
import AdminSidebar from '../includes/AdminSidebar'

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <AdminSidebar />
            {children}
        </>
    )
}

export default AdminLayout