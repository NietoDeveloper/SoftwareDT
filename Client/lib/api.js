// frontend/lib/api.js
import axios from 'axios';
import { useAuthStore } from '@/store/authStore'; // Import Zustand store for token

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Get from .env.local

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        // Get token from Zustand store (or wherever you store it)
        const token = useAuthStore.getState().token; // Access state directly outside React components
        if (token && config.headers) {
             config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for handling common errors (optional)
api.interceptors.response.use(
    (response) => response, // Simply return successful responses
    (error) => {
        // Handle specific errors globally if desired
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);

            if (error.response.status === 401) {
                // Unauthorized - maybe token expired?
                // Clear token and redirect to login using Zustand action
                console.log("Unauthorized or token expired. Logging out.");
                useAuthStore.getState().logout();
                 // Avoid redirecting here directly from interceptor if possible
                 // It's better handled in components or page-level logic
                // window.location.href = '/auth/login';
            }
            // Return a rejected promise with a structured error message
             return Promise.reject(error.response.data?.message || error.message || 'An API error occurred');

        } else if (error.request) {
            // The request was made but no response was received
            console.error('API No Response:', error.request);
            return Promise.reject('Network error: Could not reach the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('API Request Setup Error:', error.message);
            return Promise.reject(error.message || 'An error occurred while setting up the request.');
        }
    }
);

export default api; // Export the configured Axios instance