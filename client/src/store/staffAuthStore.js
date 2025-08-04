import { create } from "zustand";
import { staffAuthService } from "../services/staffAuthService";

export const useStaffAuthStore = create((set, get) => ({
    staff: null,
    isStaffAuthenticated: false,
    staffError: null,
    isStaffLoading: false,
    isStaffCheckingAuth: false,
    staffMessage: null,
    staffToken: null,

    staffSignup: async (email, username, password, role) => {
        set({ isStaffLoading: true, staffError: null });
        try {
            const response = await staffAuthService.staffSignup({ email, username, password, role });
            if (response.success) {
                set({
                    staff: response.staffMember,
                    isStaffAuthenticated: true,
                    isStaffLoading: false,
                    staffToken: response.token,
                });

                // Redirect based on staff role
                const roleRoute = response.staffMember.role.toLowerCase();
                window.location.href = `/${roleRoute}`;
                return response;
            } else {
                throw new Error(response.message || 'Staff signup failed');
            }
        } catch (error) {
            set({
                staffError: error.message || "Error signing up",
                isStaffLoading: false,
            });
            throw error;
        }
    },

    staffLogin: async (usernameOrEmail, password) => {
        set({ isStaffLoading: true, staffError: null });

        try {
            const response = await staffAuthService.staffLogin({ usernameOrEmail, password });
            if (response.success) {
                set({
                    staff: response.staffMember,
                    isStaffAuthenticated: true,
                    isStaffLoading: false,
                    staffToken: response.token,
                });

                // Redirect based on staff role
                const roleRoute = response.staffMember.role.toLowerCase();
                window.location.href = `/${roleRoute}`;
                return response;
            } else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error) {
            set({
                staffError: error.message || "Error logging in",
                isStaffLoading: false,
            });
            throw error;
        }
    },

    checkStaffAuth: async () => {
        set({ isStaffCheckingAuth: true, staffError: null });

        try {
            const staffToken = localStorage.getItem("staffToken");
            if (!staffToken) {
                set({
                    staff: null,
                    isStaffAuthenticated: false,
                    isStaffCheckingAuth: false,
                    staffToken: null,
                });
                return { success: false, message: "No staff token found" };
            }

            const response = await staffAuthService.checkStaffAuth();

            if (response.success && response.staffMember) {
                set({
                    staff: response.staffMember,
                    isStaffAuthenticated: true,
                    isStaffCheckingAuth: false,
                    staffToken: staffToken,
                    staffError: null,
                });
                return response;
            } else {
                throw new Error(response.message || "Staff authentication failed");
            }

        } catch (error) {
            console.error("Error checking staff auth:", error);
            staffAuthService.staffLogout();
            set({
                staff: null,
                isStaffAuthenticated: false,
                isStaffCheckingAuth: false,
                staffError: error.message || "Error checking staff authentication",
                staffToken: null,
            });
            return { success: false, message: error.message || "Error checking staff authentication" };
        }
    },

    staffLogout: () => {
        staffAuthService.staffLogout();
        set({
            staff: null,
            isStaffAuthenticated: false,
            staffToken: null,
            staffError: null,
            staffMessage: null
        });
        window.location.href = '/secure-auth/staff-login';
    },

    // Helper method to get current staff
    getCurrentStaff: () => {
        return get().staff;
    },

    // Clear staff errors
    clearStaffError: () => {
        set({ staffError: null });
    }
}));