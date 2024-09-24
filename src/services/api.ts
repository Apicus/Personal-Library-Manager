import axios from 'axios';

const api = axios.create ({
    baseURL: 'http://localhost:3001', //Mock Node.js server URL
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;