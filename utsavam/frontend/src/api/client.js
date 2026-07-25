import axios from 'axios';

// Set VITE_API_URL in frontend/.env, e.g.:
//   VITE_API_URL=http://localhost:7000/api
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:7000/api';

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT (once a login flow stores it) to every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('utsavam_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Surface backend error messages consistently.
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export default client;
