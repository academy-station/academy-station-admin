import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://api.weixin.qq.com/",
};

export const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
