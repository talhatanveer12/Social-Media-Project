import axios from "axios";

let headers = new Headers();
headers.append("Content-Type", "application/json");
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: headers,
});

export default axiosInstance;
