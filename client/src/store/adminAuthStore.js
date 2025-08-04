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
                    adminToken: response.adminToken,
                });

                // Redirect to admin dashboard with dynamic URL
                window.location.href = `/admin/${response.admin.admin_id}/${encodeURIComponent(response.admin.admin_email)}`;
                return response;
            } else {
                throw new Error(response.message || 'Admin signup failed');
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
                    adminToken: response.adminToken,
                });

                // Redirect to admin dashboard with dynamic URL
                window.location.href = `/admin/${response.admin.admin_id}/${encodeURIComponent(response.admin.admin_email)}`;
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
                    adminToken: adminToken,
                    adminError: null,
                });
                return response;
            } else {
                throw new Error(response.message || "Admin authentication failed");
            }

        } catch (error) {
            console.error("Error checking admin auth:", error);
            adminAuthService.adminLogout();
            set({
                admin: null,
                isAdminAuthenticated: false,
                isAdminCheckingAuth: false,
                adminError: error.message || "Error checking admin authentication",
                adminToken: null,
            });
            return { success: false, message: error.message || "Error checking admin authentication" };
        }
    },

    adminLogout: () => {
        adminAuthService.adminLogout();
        set({
            admin: null,
            isAdminAuthenticated: false,
            adminToken: null,
            adminError: null,
            adminMessage: null
        });
        window.location.href = '/secure-auth/admin-login';
    },

    // Helper method to get current admin
    getCurrentAdmin: () => {
        return get().admin;
    },

    // Clear admin errors
    clearAdminError: () => {
        set({ adminError: null });
    },

    updateAdminProfile: async (adminData) => {
        set({ isAdminLoading: true, adminError: null });
        try {
            const response = await adminAuthService.updateAdminProfile(adminData);
            if (response.success) {
                set((state) => ({
                    admin: { ...state.admin, ...response.admin },
                    isAdminLoading: false,
                }));
                return response;
            } else {
                throw new Error(response.message || 'Profile update failed');
            }
        } catch (error) {
            set({
                adminError: error.message || "Error updating profile",
                isAdminLoading: false,
            });
            throw error;
        }
    },

    updateAdminProfileImage: async (formData) => {
        set({ isAdminLoading: true, adminError: null });
        try {
            const response = await adminAuthService.updateAdminProfileImage(formData);
            if (response.success) {
                set((state) => ({
                    admin: { ...state.admin, profileImage: response.profileImageUrl },
                    isAdminLoading: false,
                }));
                return response;
            } else {
                throw new Error(response.message || 'Profile image update failed');
            }
        } catch (error) {
            set({
                adminError: error.message || "Error updating profile image",
                isAdminLoading: false,
            });
            throw error;
        }
    },

    addSecondaryEmail: async (emailData) => {
        set({ isAdminLoading: true, adminError: null });
        try {
            const response = await adminAuthService.addSecondaryEmail(emailData);
            if (response.success) {
                set((state) => ({
                    admin: { ...state.admin, secondaryEmails: [...(state.admin.secondaryEmails || []), emailData.secondaryEmail] },
                    isAdminLoading: false,
                }));
                return response;
            } else {
                throw new Error(response.message || 'Adding secondary email failed');
            }
        } catch (error) {
            set({
                adminError: error.message || "Error adding secondary email",
                isAdminLoading: false,
            });
            throw error;
        }
    }
}));