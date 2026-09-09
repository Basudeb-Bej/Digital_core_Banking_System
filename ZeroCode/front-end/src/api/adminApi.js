// front-end/src/api/adminApi.js 
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const adminApi = axios.create({
  baseURL: `${BASE_URL}/api/admin`,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("adminId");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default adminApi;