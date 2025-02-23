import axios from 'axios';

// Set the baseURL using the environment variable VITE_API_URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';  // Default to local URL for development

// Configure axios defaults
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for handling tokens
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
