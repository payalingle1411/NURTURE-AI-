import axios from "axios";

const API = axios.create({
  baseURL: "http://10.157.64.217:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export default API;