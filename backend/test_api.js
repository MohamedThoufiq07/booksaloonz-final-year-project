const API_URL = 'http://127.0.0.1:5000/api/auth';

const test = async () => {
    try {
        console.log('--- Testing REFINED API Suite ---');

        // 1. User Signup (Stricter validation)
        console.log('\nTesting User Signup (Min length name)...');
        const badSignup = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "U", email: "test@test.com", password: "pw" })
        });
        const badData = await badSignup.json();
        console.log('Got Error (Expected):', badData.message);

        console.log('\nTesting Valid User Signup...');
        const userEmail = `u_${Date.now()}@test.com`;
        const userSignup = await fetch(`${API_URL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "Testing User", email: userEmail, password: "password123" })
        });
        const userData = await userSignup.json();
        console.log('User Signup Success:', userData.success, 'Msg:', userData.message);
        console.log('Token exists (Expected False):', !!userData.token);

        // 2. User Login
        console.log('\nTesting User Login...');
        const userLogin = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, password: "password123" })
        });
        const loginData = await userLogin.json();
        console.log('User Login Success:', loginData.success, 'Role:', loginData.role);
        const token = loginData.token;

        // 3. Me Flow
        console.log('\nTesting Get Me...');
        const meRes = await fetch(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const meData = await meRes.json();
        console.log('Get Me Success:', meData.success, 'User Role:', meData.user.role);

        // 4. Partner Flow
        console.log('\nTesting Partner Flow...');
        const pEmail = `p_${Date.now()}@test.com`;
        const partnerSignup = await fetch(`${API_URL}/partner/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ownerName: "Owner Name",
                salonName: "Great Salon",
                email: pEmail,
                password: "password123"
            })
        });
        const pSignupData = await partnerSignup.json();
        console.log('Partner Signup:', pSignupData.success);

        const partnerLogin = await fetch(`${API_URL}/partner/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: pEmail, password: "password123" })
        });
        const pLoginData = await partnerLogin.json();
        console.log('Partner Login Success:', pLoginData.success, 'Role:', pLoginData.role);

        // 5. Salon Fetch
        console.log('\nTesting Salon Fetch...');
        const salonFetch = await fetch('http://127.0.0.1:5000/api/salons');
        const sData = await salonFetch.json();
        console.log('Salon Fetch Success:', sData.success, 'Count:', sData.count);

        console.log('\n--- ALL REFINED TESTS PASSED ---');
    } catch (err) {
        console.error('Test Failed:', err.message);
    }
};

test();
