import { create } from "zustand";
import { adminAuthService } from "../services/adminAuthService";

export const useAdminAuthStore = create((set, get) => ({
    admin: null,
    isAdminAuthenticated: false,
    adminError: null,
    isAdminLoading: false,
    isAdminCheckingAuth: false,
    adminMessage: null,
    adminToken: null,

    adminSignup: async (email, username, password) => {
        set({ isAdminLoading: true, adminError: null });
        try {

            const response = await adminAuthService.adminSignup({ email, password, username });
            if (response.success) {
                set({
                    admin: response.admin,
                    isAdminAuthenticated: true,
                    isAdminLoading: false,
                    adminToken: response.token,
                });

                return response;
            }

        } catch (error) {
            set({
                adminError: error.message || "Error signing up",
                isAdminLoading: false,
            });
            throw error;
        }
    },

    adminLogin: async (email, password) => {
        set({ isAdminLoading: true, adminError: null });

        try {
            const response = await adminAuthService.adminLogin({ email, password });
            if (response.success) {
                set({
                    admin: response.admin,
                    isAdminAuthenticated: true,
                    isAdminLoading: false,
                    adminToken: response.token,
                });
                return response;
            } else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error) {
            set({
                adminError: error.message || "Error logging in",
                isAdminLoading: false,
            });
            throw error;
        }
    },

    checkAdminAuth: async () => {
        set({ isAdminCheckingAuth: true, adminError: null });

        try {

            const adminToken = localStorage.getItem("adminToken");
            if (!adminToken) {
                set({
                    admin: null,
                    isAdminAuthenticated: false,
                    isAdminCheckingAuth: false,
                    adminToken: null,
                });
                return { success: false, message: "No admin token found" };
            }

            const response = await adminAuthService.checkAdminAuth();

            if (response.success && response.admin) {
                set({
                    admin: response.admin,
                    isAdminAuthenticated: true,
                    isAdminCheckingAuth: false,
                    adminToken: response.token,
                    adminError: null,
                });
                return response;
            } else {
                throw new Error(response.message || "Admin authentication failed");
            }

        } catch (error) {
            console.error("Error checking admin auth:", error);
            set({
                admin: null,
                isAdminAuthenticated: false,
                isAdminCheckingAuth: false,
                adminError: error.message || "Error checking admin authentication",
                adminToken: null,
            });
            return { success: false, message: error.message || "Error checking admin authentication" };
        }
    }
}));