import axios from 'axios';

// Detect environment and use appropriate API URL
const getApiUrl = () => {
  // If running on Render (production)
  if (window.location.hostname !== 'localhost') {
    return 'https://ecommerce-backend1-o3ek.onrender.com/api';
  }
  // Local development
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log('🔧 API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000, // 30 seconds timeout
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('📤 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('📥 API Response Error:', error.response?.status, error.message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;