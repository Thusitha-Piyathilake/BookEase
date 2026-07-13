import axios from "axios";

const api = axios.create({
  baseURL: 'https://bookease-production-c4b5.up.railway.app',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;