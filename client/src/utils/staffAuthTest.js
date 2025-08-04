// Staff Authentication Integration Test
// This is a simple test file to verify the staff login process

import { staffAuthService } from './services/staffAuthService';
import { useStaffAuthStore } from './store/staffAuthStore';

// Test staff login credentials (for development only)
const testStaffCredentials = {
    usernameOrEmail: 'manager@test.com',
    password: 'password123'
};

// Test the staff auth service directly
export const testStaffAuthService = async () => {
    try {
        console.log('Testing staff login service...');
        const result = await staffAuthService.staffLogin(testStaffCredentials);
        console.log('Staff login result:', result);
        return result;
    } catch (error) {
        console.error('Staff login test failed:', error);
        throw error;
    }
};

// Test the staff auth store
export const testStaffAuthStore = () => {
    const store = useStaffAuthStore.getState();
    console.log('Staff auth store state:', {
        isStaffAuthenticated: store.isStaffAuthenticated,
        staff: store.staff,
        isStaffLoading: store.isStaffLoading,
        staffError: store.staffError
    });
};

// Helper function to manually test staff login
export const manualStaffLogin = async (usernameOrEmail, password) => {
    const store = useStaffAuthStore.getState();
    try {
        const result = await store.staffLogin(usernameOrEmail, password);
        console.log('Manual staff login successful:', result);
        return result;
    } catch (error) {
        console.error('Manual staff login failed:', error);
        throw error;
    }
};

// Helper function to test staff logout
export const testStaffLogout = () => {
    const store = useStaffAuthStore.getState();
    store.staffLogout();
    console.log('Staff logout executed');
};

export default {
    testStaffAuthService,
    testStaffAuthStore,
    manualStaffLogin,
    testStaffLogout
};
