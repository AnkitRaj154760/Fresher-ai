import axios from "axios";

const defaultBackendUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : (import.meta.env.VITE_BACKEND_URL || "https://fresherai-gateway-rqfs.onrender.com");

const api = axios.create({
    baseURL: defaultBackendUrl,
    withCredentials: true
});

export default api;