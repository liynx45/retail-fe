import axios, { AxiosRequestConfig } from "axios";
import { decryptData, encryptData } from "../crypto";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const headers = {
  Accept: "application/json",
}

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: headers
})

let IsRefreshing = false
const refreshAndRetryQueue: RetryQueueItem[] = [];

axiosPrivate.interceptors.request.use(
  (config) => {

    const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
    const decryptAccess = decryptData(accessToken!)

    if (decryptAccess) {
      config.headers["Authorization"] = `Bearer ${decryptAccess}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config
    if (error.response && error.response.status === 401) {
      if (!IsRefreshing) {
        IsRefreshing = true
        try {
          const newAccessToken = await axiosPrivate.get("/auth/refresh")
          IsRefreshing = true
          if (newAccessToken.status === 200) {
            window.localStorage.setItem(process.env.REACT_APP_LOCAL_KEY!, encryptData(newAccessToken.data.data.access_Token))

            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosPrivate
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            refreshAndRetryQueue.length = 0;

            return axiosPrivate(originalReq)
          }
          return error
        } catch (err) {
          window.location.href = "/"
          window.localStorage.removeItem(process.env.REACT_APP_LOCAL_KEY!)
          window.localStorage.removeItem("_user")
          throw err
        } finally {
          IsRefreshing = false
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalReq, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate