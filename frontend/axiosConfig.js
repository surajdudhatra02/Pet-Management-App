import axios from 'axios';

// Use the API URL from the environment variable
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback to localhost for development

// Configure axios defaults
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

console.log(baseURL)

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
