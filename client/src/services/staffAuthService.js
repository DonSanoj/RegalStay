import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const staffToken = localStorage.getItem("staffToken");
        if (staffToken) {
            config.headers.Authorization = `Bearer ${staffToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("staffToken");
            localStorage.removeItem("isStaffAuthenticated");
            localStorage.removeItem("staffData");

            if (!window.location.pathname.includes("/secure-auth/staff-login")) {
                window.location.href = "/secure-auth/staff-login";
            }
        }
        return Promise.reject(error);
    }
);

export const staffAuthService = {
    staffSignup: async (staffData) => {
        try {
            // Transform field names to match backend StaffAuthDTO
            const transformedData = {
                staffMemberName: staffData.username,
                staffMemberEmail: staffData.email,
                password: staffData.password,
                role: staffData.role
            };

            const response = await api.post('/api/staff/auth/signup', transformedData);
            if (response.data.success && response.data.token) {
                localStorage.setItem('staffToken', response.data.token);
                localStorage.setItem('isStaffAuthenticated', 'true');
                localStorage.setItem('staffData', JSON.stringify(response.data.staffMember));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    staffLogin: async (credentials) => {
        try {
            // Transform field names to match backend StaffLoginDTO
            const transformedData = {
                staffMemberNameOrStaffMemberEmail: credentials.usernameOrEmail,
                staffMemberPassword: credentials.password
            };

            console.log('Original credentials:', credentials);
            console.log('Transformed data sent to backend:', transformedData);

            const response = await api.post('/api/staff/auth/login', transformedData);
            if (response.data.success && response.data.token) {
                localStorage.setItem('staffToken', response.data.token);
                localStorage.setItem('isStaffAuthenticated', 'true');
                localStorage.setItem('staffData', JSON.stringify(response.data.staffMember));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    checkStaffAuth: async () => {
        try {
            const response = await api.get('/api/staff/auth/checkAuth');
            return response.data;
        } catch (error) {
            // Clear stored auth data on auth failure
            staffAuthService.staffLogout();
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    staffLogout: () => {
        localStorage.removeItem('staffToken');
        localStorage.removeItem('isStaffAuthenticated');
        localStorage.removeItem('staffData');
    }
};