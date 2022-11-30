import axios from "axios";

const token = localStorage.getItem('token');


const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { 'Content-Type': 'application/json',
  'x-auth-token': token ? token : ''},
});

export default axiosInstance;

export const axiosFileInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { 'Content-Type': 'multipart/form-data',
  'x-auth-token': token ? token : ''},
});