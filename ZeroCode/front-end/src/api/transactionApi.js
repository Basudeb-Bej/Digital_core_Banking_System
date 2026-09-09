// front-end/src/api/transactionApi.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const transactionApi = axios.create({
  baseURL: `${BASE_URL}/api/transactions`,
});

transactionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default transactionApi;