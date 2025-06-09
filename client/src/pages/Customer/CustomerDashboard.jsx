import { useAuthStore } from '@/store/authStore';
import React, { useEffect } from 'react'

const CustomerDashboard = () => {

    const { user } = useAuthStore();

    useEffect(() => {
        document.title = `${user?.username}'s Dashboard `;
    })

    return (
        <div>CustomerDashboard</div>
    )
}

export default CustomerDashboard