import { useAuthStore } from '@/store/authStore'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated, isCheckingAuth, user, checkAuth} = useAuthStore();
    const [authCheckComplete, setAuthCheckComplete] = useState(false);

    useEffect(() => {
        const performAuthCheck = async () => {
            if (!authCheckComplete) {
                try {
                    await checkAuth();
                } catch (error) {
                    console.error("Auth check failed:", error);
                } finally {
                    setAuthCheckComplete(true);
                }
            }
        };

        if (!isAuthenticated && !isCheckingAuth) {
            performAuthCheck();
        } else {
            setAuthCheckComplete(true);
        }
    }, [isAuthenticated, isCheckingAuth, checkAuth, authCheckComplete]);

    // Show loading while checking authentication
    if (isCheckingAuth || !authCheckComplete) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    // If user is authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
        if (user.role === 'CUSTOMER') {
            return <Navigate to={`/customer/${user.id}/${encodeURIComponent(user.email)}`} replace />;
        } else {
            return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
        }
    }
    
    return children;
};