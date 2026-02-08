const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

const testRegistrationAndLogin = async () => {
    const email = 'perfectthoufiq@gmail.com';
    const password = 'password123';

    try {
        console.log('--- Registering User ---');
        const signupRes = await axios.post(`${API_URL}/user/signup`, {
            name: "Thoufiq",
            email: email,
            password: password
        });
        console.log('Signup Result:', signupRes.data);

        console.log('\n--- Logging in with the registered user ---');
        const loginRes = await axios.post(`${API_URL}/user/login`, {
            email: email,
            password: password
        });
        console.log('Login Result:', loginRes.data);

    } catch (err) {
        console.error('Error during test:', err.response ? err.response.data : err.message);
    }
};

testRegistrationAndLogin();
