import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
            
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    signup: async (userData) => {
        try {
            const response = await api.post('/api/auth/signup', userData);
            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: 'Network error occurred' };
            throw errorData;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', credentials);
            if (response.data.success && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userData', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            const errorData = error.response?.data || { message: 'Network error occurred' };
            throw errorData;
        }
    },

    checkAuth: async () => {
        try {
            const response = await api.get('/api/auth/checkAuth');
            return response.data;
        } catch (error) {
            // Clear stored auth data on auth failure
            authService.logout();
            const errorData = error.response?.data || { message: 'Network error occurred' };
            throw errorData;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
    }
};
