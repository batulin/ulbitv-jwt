import axios from "axios";

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('accessToken', response.data.accessToken);
            return api.request(originalRequest);
        } catch (e) {
            console.log('unauthorized')
        }
    }
    throw error;
})

export default api;