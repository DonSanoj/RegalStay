import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    signup: async (userData) => {
        try {
            const response = await api.post(`${API_URL}/api/auth/signup`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error occurred' };
        }
    },

    login: async (credentials) => {
        try {
            const loginData = {
                usernameOrEmail: credentials.email || credentials.usernameOrEmail,
                password: credentials.password
            };
            const response = await api.post('/api/auth/login', loginData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error occurred' };
        }
    },
};
