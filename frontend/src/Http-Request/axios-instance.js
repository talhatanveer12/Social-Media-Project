import axios from "axios";
//import * as process from "process";

const token = localStorage.getItem("token");
console.log(process.env.REACT_APP_BASE_URL);
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token ? token : "",
  },
});

export default axiosInstance;

export const axiosFileInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "x-auth-token": token ? token : "",
  },
});
