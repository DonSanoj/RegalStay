import { useAuthStore } from '@/store/authStore';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore();
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const performAuthCheck = async () => {
            if (!isAuthenticated && !isCheckingAuth) {
                try {
                    await checkAuth();
                } catch (error) {
                    console.error("Auth check failed:", error);
                } finally {
                    setAuthCheckComplete(true);
                }
            } else {
                setAuthCheckComplete(true);
            }
        };

        performAuthCheck();
    }, [isAuthenticated, isCheckingAuth, checkAuth]);

    // Show loading while checking authentication
    if (isCheckingAuth || !authCheckComplete) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
                    <p className="text-white">Authenticating...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Store the current location for redirect after login
        localStorage.setItem('redirectAfterLogin', location.pathname);
        return <Navigate to="/auth/login" replace />;
    }

    // Check role-based access if required
    if (requiredRole && user?.role !== requiredRole) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black">
                <div className="text-center text-red-500">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p>You don't have permission to access this page.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default ProtectedRoute;