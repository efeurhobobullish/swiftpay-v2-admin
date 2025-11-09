import axios from "axios";
import { useAuthStore } from "@/stores"; 

const api = axios.create({
  baseURL: "https://swiftpay-v2-backend-caa6dcc63849.herokuapp.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
