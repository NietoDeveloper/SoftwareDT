import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = 'http://localhost:5000/api';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

let interceptorsConfigured = false;

const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
  if (interceptorsConfigured) return;

  axiosPrivate.interceptors.request.use(
    async (config) => {
      let token = getAccessToken();
      if (!token) {
        try {
          token = await refreshAccessToken();
          setAccessToken(token);
        } catch (error) {
          console.error("Failed to refresh token on request:", error);
          if (onLogout) {
            onLogout();
          }
          return Promise.reject(error);
        }
      }
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      const status = error.response?.status;

      if (status === 401 && !prevRequest._retry) {
        prevRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          setAccessToken(newAccessToken);
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } catch (refreshError) {
          console.error("Token refresh failed, forcing logout:", refreshError);
          if (onLogout) {
            onLogout();
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  interceptorsConfigured = true;
};

export {
  axiosPublic,
  axiosAuth,
  axiosPrivate,
  setupInterceptors
};