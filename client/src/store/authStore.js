import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,
    message: null,
    token: null,

    signup: async (email, username, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.signup({ email, password, username });
            if (response.success) {
                set({
                    user: response.user,
                    isAuthenticated: true,
                    isLoading: false,
                    token: response.token,
                });
                
                // Redirect to customer dashboard with dynamic URL
                window.location.href = `/customer/${response.user.id}/${encodeURIComponent(response.user.email)}`;
                return response;
            } else {
                throw new Error(response.message || 'Signup failed');
            }
        } catch (error) {
            set({
                error: error.message || "Error signing up",
                isLoading: false,
            });
            throw error;
        }
    },

    login: async (usernameOrEmail, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login({ usernameOrEmail, password });

            if (!response.success) {
                throw new Error(response.message || 'Login failed');
            }

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
                token: response.token,
            });

            // Redirect based on user role
            if (response.user.role === 'CUSTOMER') {
                const redirectPath = localStorage.getItem("redirectAfterLogin");
                const targetPath = redirectPath || `/customer/${response.user.id}/${encodeURIComponent(response.user.email)}`;
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = targetPath;
            } else {
                // For staff roles, redirect to appropriate dashboard
                window.location.href = `/${response.user.role.toLowerCase()}`;
            }

            return response;
        } catch (error) {
            set({
                error: error.message || "Error logging in",
                isLoading: false,
            });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });

        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                // No token, user is not authenticated
                set({
                    user: null,
                    isAuthenticated: false,
                    isCheckingAuth: false,
                    token: null
                });
                return { success: false, message: 'No token found' };
            }

            // Verify token with server
            const response = await authService.checkAuth();
            
            if (response.success && response.user) {
                set({
                    user: response.user,
                    isAuthenticated: true,
                    isCheckingAuth: false,
                    token: token,
                    error: null
                });
                return response;
            } else {
                throw new Error(response.message || 'Auth check failed');
            }

        } catch (error) {
            console.error("Auth check error:", error);
            
            // Clear all auth data on failure
            authService.logout();
            set({
                user: null,
                isAuthenticated: false,
                isCheckingAuth: false,
                token: null,
                error: error.message
            });
            return { success: false, message: error.message };
        }
    },

    logout: () => {
        authService.logout();
        set({
            user: null,
            isAuthenticated: false,
            token: null,
            error: null,
            message: null
        });
        window.location.href = '/auth/login';
    },

    // Helper method to get current user
    getCurrentUser: () => {
        return get().user;
    },

    // Clear errors
    clearError: () => {
        set({ error: null });
    }
}));
