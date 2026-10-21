import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:3000" : "");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
