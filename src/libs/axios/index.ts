import axios from "axios";
import { decryptData, encryptData } from "../crypto";

const headers = {
  Accept: "application/json",
}

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
  headers: headers
})


axiosPrivate.interceptors.request.use(
  (config) => {

    const accessToken = window.localStorage.getItem(process.env.REACT_APP_LOCAL_KEY!)
    const decryptAccess = decryptData(accessToken!)

    if (decryptAccess) {
      console.log("axios success");
      config.headers["Authorization"] = `Bearer ${decryptAccess}`
      return config;
    } else {
      console.log("axios fail");
      return config
    }
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
      originalReq._retry = true
      try {
        const newAccessToken = await axiosPrivate.get("/auth/refresh")

        if (newAccessToken.status === 200) {
          window.localStorage.setItem(process.env.REACT_APP_LOCAL_KEY!, encryptData(newAccessToken.data.data.access_Token))
        }
        return error
      } catch (err) {
        window.localStorage.removeItem(process.env.REACT_APP_LOCAL_KEY!)
        window.localStorage.removeItem("_user")
        throw err
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate