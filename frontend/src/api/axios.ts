import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogspage-bzot.onrender.com/api",
  withCredentials:true
});

export default axiosInstance;
