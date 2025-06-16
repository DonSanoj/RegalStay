import { useAdminAuthStore } from '@/store/adminAuthStore';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const AuthenticatedAdmin = ({ children }) => {

    const { isAdminAuthenticated, admin, isAdminCheckingAuth, checkAdminAuth } = useAdminAuthStore();
    const [adminAuthCheckComplete, setAdminAuthCheckComplete] = useState(false);

    useEffect(() => {
        const performAdminAuthCheck = async () => {
            if (!adminAuthCheckComplete) {
                try {
                    await checkAdminAuth();
                } catch (error) {
                    console.error("Admin auth check failed:", error);
                } finally {
                    setAdminAuthCheckComplete(true);
                }
            }
        };

        if (!isAdminAuthenticated && !isAdminCheckingAuth) {
            performAdminAuthCheck();
        } else {
            setAdminAuthCheckComplete(true);
        }
    }, [isAdminAuthenticated, isAdminCheckingAuth, checkAdminAuth, adminAuthCheckComplete]);

    if (isAdminCheckingAuth || !adminAuthCheckComplete) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    if (isAdminAuthenticated && admin) {
        if (admin.admin_role === 'ADMIN') {
            return <Navigate to={`/admin/${admin.admin_id}/${encodeURIComponent(admin.admin_email)}`} replace />;
        }
    }

    return children;
}

export default AuthenticatedAdmin