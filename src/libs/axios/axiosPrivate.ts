import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { decryptData, encryptData } from "../crypto";

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

const headers = {
  Accept: "application/json",
}

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: headers
})

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

let IsRefreshing = false
axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error
    if (error.response && error.response.status === 401) {
      if (error.response.status === 401 && error.config.url === "/auth/refresh") {
        return new Promise<void>((resolve, reject) => {
          reject(error)
        })
      }
      if (!IsRefreshing) {
        IsRefreshing = true
        try {
          const newAccessToken = await axiosPrivate.get("/auth/refresh")
          if (newAccessToken.status === 200) {
            window.localStorage.setItem(process.env.REACT_APP_LOCAL_KEY!, encryptData(newAccessToken.data.data.access_Token))

            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosPrivate
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });
            IsRefreshing = false
            refreshAndRetryQueue.length = 0;
            return axiosPrivate(originalReq)
          }
        } catch (err) {
          window.location.href = "/"
          window.localStorage.removeItem(process.env.REACT_APP_LOCAL_KEY!)
          window.localStorage.removeItem("_user")
          throw err
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalReq.config, error: originalReq.response, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate