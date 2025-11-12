import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export default api;
