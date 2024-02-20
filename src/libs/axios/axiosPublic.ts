import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
})

export default axiosPublic
