import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 ||
      (
        error.response?.status === 404 &&
        error.config?.url?.includes("/users/profile")
      )
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);