import { useAdminAuthStore } from '@/store/adminAuthStore';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const { isAdminAuthenticated, isAdminCheckingAuth, checkAdminAuth, admin } = useAdminAuthStore();
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const performAuthCheck = async () => {
            if (!isAdminAuthenticated && !isAdminCheckingAuth) {
                try {
                    await checkAdminAuth();
                } catch (error) {
                    console.error("Admin auth check failed:", error);
                } finally {
                    setAuthCheckComplete(true);
                }
            } else {
                setAuthCheckComplete(true);
            }
        };

        performAuthCheck();
    }, [isAdminAuthenticated, isAdminCheckingAuth, checkAdminAuth]);

    // Show loading while checking authentication
    if (isAdminCheckingAuth || !authCheckComplete) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Authenticating Admin...</p>
                </div>
            </div>
        );
    }

    // Redirect to admin login if not authenticated
    if (!isAdminAuthenticated) {
        return <Navigate to="/secure-auth/admin-login" replace />;
    }

    return <>{children}</>;
}

export default AdminProtectedRoute;
