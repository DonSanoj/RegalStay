// Test script to verify staff authentication
const axios = require('axios');

const API_URL = "http://localhost:8080";

// Test data
const testStaffData = {
    staffMemberName: "Manager User",
    staffMemberEmail: "manager@gmail.com",
    password: "12345678",
    role: "MANAGER"
};

const testLoginData = {
    staffMemberNameOrStaffMemberEmail: "manager@gmail.com",
    staffMemberPassword: "12345678"
};

async function testStaffSignup() {
    try {
        console.log('\n=== Testing Staff Signup ===');
        console.log('Sending signup data:', testStaffData);
        
        const response = await axios.post(`${API_URL}/api/staff/auth/signup`, testStaffData);
        console.log('Signup successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        return null;
    }
}

async function testStaffLogin() {
    try {
        console.log('\n=== Testing Staff Login ===');
        console.log('Sending login data:', testLoginData);
        
        const response = await axios.post(`${API_URL}/api/staff/auth/login`, testLoginData);
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        return null;
    }
}

async function runTests() {
    console.log('Starting Staff Authentication Tests...\n');
    
    // First try login (to see if user exists)
    await testStaffLogin();
    
    // If login fails, try signup first
    await testStaffSignup();
    
    // Then try login again
    await testStaffLogin();
}

// Run the tests
runTests().catch(console.error);
