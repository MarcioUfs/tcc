import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: 'http://localhost:3030'
    // baseURL: 'http://172.23.14.54:3030'
    // baseURL: 'http://172.23.14.82:3030'
    // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3030'
})
api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;