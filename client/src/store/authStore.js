import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, username, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.signup({ email, password, username });
            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error.message || "Error signing up",
                isLoading: false,
            });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login({ email, password });

            if (response.user.isFlagged) {
                set({ isLoading: false });
                return {
                    error: true,
                    isFlagged: true,
                    message: "Your account has been suspended. Please contact support.",
                };
            }

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            const redirectPath = localStorage.getItem("redirectAfterLogin");
            if (redirectPath) {
                localStorage.removeItem("redirectAfterLogin");
                window.location.href = redirectPath;
            } else {
                window.location.href = `/student/${response.user._id}/${response.user.email}`;
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
}));
