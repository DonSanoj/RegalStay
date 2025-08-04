import { useStaffAuthStore } from '@/store/staffAuthStore';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const StaffProtectedRoute = ({ children, requiredRole }) => {

    const { isStaffAuthenticated, isStaffCheckingAuth, checkStaffAuth, staff } = useStaffAuthStore();
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const performAuthCheck = async () => {
            if (!isStaffAuthenticated && !isStaffCheckingAuth) {
                try {
                    await checkStaffAuth();
                } catch (error) {
                    console.error("Staff auth check failed:", error);
                } finally {
                    setAuthCheckComplete(true);
                }
            } else {
                setAuthCheckComplete(true);
            }
        };

        performAuthCheck();
    }, [isStaffAuthenticated, isStaffCheckingAuth, checkStaffAuth]);

    if (isStaffCheckingAuth || !authCheckComplete) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Authenticating Staff Member...</p>
                </div>
            </div>
        );
    }

    if (!isStaffAuthenticated) {
        return <Navigate to="/secure-auth/staff-login" replace state={{ from: location }} />;
    }

    // Check role-based access if required
    if (requiredRole && staff?.role !== requiredRole) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center text-red-500">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p>You don't have permission to access this page.</p>
                    <p className="text-sm text-gray-400 mt-2">Required role: {requiredRole}</p>
                    <p className="text-sm text-gray-400">Your role: {staff?.role}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>
}

export default StaffProtectedRoute;