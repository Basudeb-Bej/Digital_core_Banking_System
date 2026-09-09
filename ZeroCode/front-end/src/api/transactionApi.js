// front-end/src/api/transactionApi.js
import axios from "axios";

const transactionApi = axios.create({
  baseURL: "http://localhost:8000/api/transactions",
});

transactionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default transactionApi;