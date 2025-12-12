import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fullday.lat/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor if we need to add tokens later
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
