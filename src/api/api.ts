import axios from 'axios';
import { AuthResponse } from '../services/AuthService';

export const API_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// eslint-disable-next-line consistent-return
api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest && !originalRequest.isRetry) {
    originalRequest.isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      return api.request(originalRequest);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }
  throw error;
});

export default api;
