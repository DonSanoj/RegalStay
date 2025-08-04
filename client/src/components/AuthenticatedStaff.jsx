import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStaffAuthStore } from '@/store/staffAuthStore';

const AuthenticatedStaff = ({ children }) => {

    const { isStaffAuthenticated, staff, isStaffCheckingAuth, checkStaffAuth } = useStaffAuthStore();
    const [staffAuthCheckComplete, setStaffAuthCheckComplete] = useState(false);

    useEffect(() => {
        const performStaffAuthCheck = async () => {
            if (!staffAuthCheckComplete) {
                try {
                    await checkStaffAuth();
                } catch (error) {
                    console.error("Staff auth check failed:", error);
                } finally {
                    setStaffAuthCheckComplete(true);
                }
            }
        };

        if (!isStaffAuthenticated && !isStaffCheckingAuth) {
            performStaffAuthCheck();
        } else {
            setStaffAuthCheckComplete(true);
        }
    }, [isStaffAuthenticated, isStaffCheckingAuth, checkStaffAuth, staffAuthCheckComplete]);

    if (!staffAuthCheckComplete || isStaffCheckingAuth) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    if (isStaffAuthenticated && staff) {
        // Redirect to appropriate staff dashboard based on role
        const roleRoute = staff.role.toLowerCase();
        return <Navigate to={`/${roleRoute}`} replace />;
    }

    return children;
}

export default AuthenticatedStaff