import { mainUrl } from "@/constants";
import store from "@/store/store";
import axios from "axios";

const request = axios.create({
  baseURL: mainUrl,
  withCredentials: true,
});
request.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token =
      state.auth?.token ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally handle 401 errors (unauthorized access)
      // e.g., redirect to login page, clear token, etc.
      // Example:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;
