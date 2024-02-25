import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_URL

const axiosClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  const client = axios.create({
    baseURL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

const api = axiosClient()
export {isAxiosError} from 'axios';
export default api;