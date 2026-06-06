import axios from 'axios';
import { local } from './storage';

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api/v1' : 'http://localhost:5000/api/v1');

// Create a global Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = local.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle global errors like expired tokens and basic retries
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Basic Retry Mechanism for 5xx errors or Network Timeout (Max 2 retries)
    if (config) {
      config.retryCount = config.retryCount || 0;

      const isRetryableError =
        !error.response || (error.response.status >= 500 && error.response.status < 600);

      if (isRetryableError && config.retryCount < 2) {
        config.retryCount += 1;
        // Exponential backoff: 1s, then 2s
        const delay = new Promise((resolve) => setTimeout(resolve, config.retryCount * 1000));
        await delay;
        return api(config);
      }
    }

    // If the server returns 401 Unauthorized, the token is invalid or expired
    if (error.response && error.response.status === 401) {
      local.clearAll();
      // Redirect to login page to force re-authentication
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
