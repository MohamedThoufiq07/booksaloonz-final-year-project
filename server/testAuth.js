const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testUserSignup = async () => {
    try {
        console.log('--- Testing User Signup ---');
        const res = await axios.post(`${API_URL}/user/signup`, {
            name: "Test User",
            email: `testuser_${Date.now()}@example.com`,
            password: "password123"
        });
        console.log('Success:', res.data);
        return res.data.token;
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

const testUserLogin = async (email, password) => {
    try {
        console.log('\n--- Testing User Login ---');
        const res = await axios.post(`${API_URL}/user/login`, {
            email,
            password
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

const testPartnerSignup = async () => {
    try {
        console.log('\n--- Testing Partner Signup ---');
        const res = await axios.post(`${API_URL}/partner/signup`, {
            ownerName: "Partner Name",
            email: `partner_${Date.now()}@example.com`,
            password: "password123",
            salonName: "Glow & Shine Salon",
            address: "123 Beauty Lane, City",
            startingPrice: 300
        });
        console.log('Success:', res.data);
        return res.data.token;
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

const testMe = async (token) => {
    try {
        console.log('\n--- Testing /me Endpoint ---');
        const res = await axios.get(`http://localhost:5000/api/auth/me`, {
            headers: { 'x-auth-token': token }
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

const runTests = async () => {
    const email = `TestUser_${Date.now()}@Example.Com`; // Mixed case
    const password = " password123 "; // with spaces

    // 1. User Signup
    console.log('--- Testing User Signup with Mixed Case and Spaces ---');
    const signupRes = await axios.post(`${API_URL}/user/signup`, {
        name: "Test User",
        email: email,
        password: password
    });
    console.log('Signup Success:', signupRes.data.success);

    // 2. User Login with different case
    console.log('\n--- Testing Login with Lowercase Email ---');
    const loginRes = await axios.post(`${API_URL}/user/login`, {
        email: email.toLowerCase(),
        password: password.trim()
    });
    console.log('Login Success:', loginRes.data.success);
    const token = loginRes.data.token;

    // 3. Test /me
    await testMe(token);

    // 4. Partner Signup
    await testPartnerSignup();

    console.log('\n--- Tests Completed ---');
};

// Note: This script requires the server to be running.
runTests();
