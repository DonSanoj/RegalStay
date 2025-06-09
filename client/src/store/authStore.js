import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      clearError: () => set({ error: null }),
      
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
      
      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          
          const data = await response.json();
          
          if (data.success) {
            set({ user: data.user, isAuthenticated: true, isLoading: false });
            return { success: true, message: data.message };
          } else {
            set({ error: data.message, isLoading: false });
            return { success: false, message: data.message };
          }
        } catch (error) {
          set({ error: 'Network error occurred', isLoading: false });
          return { success: false, message: 'Network error occurred' };
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
