import { getToken } from "@/actions/TokenStore";
import axios from "axios";
import { API_HOST } from "@/utils/env";

const axiosClient = axios.create({
  baseURL: API_HOST,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

// Interceptor: tự động gắn token từ TokenStore
axiosClient.interceptors.request.use(async (config) => {
  const access_token = await getToken("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export default axiosClient;
