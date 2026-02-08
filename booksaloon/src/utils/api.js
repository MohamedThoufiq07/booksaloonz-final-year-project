import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Point to backend server
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
