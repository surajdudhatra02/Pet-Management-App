import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // Default to local URL for development

// Configure axios defaults
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add request interceptor for handling tokens
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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