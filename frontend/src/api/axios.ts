import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blogspage-bzot.onrender.com/api",
  //  baseURL: "http://localhost:4000/api",
  withCredentials:true
});

export default axiosInstance;
