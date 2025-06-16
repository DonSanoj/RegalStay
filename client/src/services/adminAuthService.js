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
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            config.headers.Authorization = `Bearer ${adminToken}`;
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
            // Admin token expired or invalid
            localStorage.removeItem("adminToken");
            localStorage.removeItem("isAdminAuthenticated");
            localStorage.removeItem("adminData");

            // Only redirect if not already on admin login page
            if (!window.location.pathname.includes("/secure-auth/admin-login")) {
                window.location.href = "/secure-auth/admin-login";
            }
        }
        return Promise.reject(error);

    }
);

export const adminAuthService = {
    adminSignup: async (adminData) => {
        try {
            // Transform field names to match backend AdminAuthDTO
            const transformedData = {
                adminUsername: adminData.username,
                adminEmail: adminData.email,
                adminPassword: adminData.password
            };
            
            // Debug: Log the transformed data
            console.log('Transformed signup data:', transformedData);
            
            const response = await api.post("/api/admin/auth/signup", transformedData);
            if (response.data.success && response.data.adminToken) {
                localStorage.setItem("adminToken", response.data.adminToken);
                localStorage.setItem("isAdminAuthenticated", "true");
                localStorage.setItem("adminData", JSON.stringify(response.data.admin));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    adminLogin: async (credentials) => {
        try {
            // Transform field names to match backend AdminLoginDTO expectations
            const transformedCredentials = {
                adminUsernameOrAdminEmail: credentials.adminEmail || credentials.email || credentials.username,
                adminPassword: credentials.adminPassword || credentials.password
            };
            
            console.log('Transformed login data:', transformedCredentials);
            
            const response = await api.post("/api/admin/auth/login", transformedCredentials);
            if (response.data.success && response.data.adminToken) {
                localStorage.setItem("adminToken", response.data.adminToken);
                localStorage.setItem("isAdminAuthenticated", "true");
                localStorage.setItem("adminData", JSON.stringify(response.data.admin));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    checkAdminAuth: async () => {
        try {
            // Fix the endpoint path to match backend controller
            const response = await api.get("/api/admin/auth/adminCheckAuth");
            return response.data;

        } catch (error) {
            adminAuthService.adminLogout();
            const errorData = error.response?.data || { message: "Network error occurred" };
            throw errorData;
        }
    },

    adminLogout: () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("isAdminAuthenticated");
        localStorage.removeItem("adminData");
    },
};