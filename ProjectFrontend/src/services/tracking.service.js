import axios from "axios";
import authService from "./auth.service";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createTracking = (requestBody) => {
    return this.api.post("/api/tracking", requestBody);
  };

  getAllTrackers = () => {
    return this.api.get("/api/trackings");
  };

  getTracker = (id) => {
    return this.api.get(`/api/trackings/${id}`);
  };

  updateTracker = (id, requestBody) => {
    return this.api.put(`/api/trackings/${id}`, requestBody);
  };

  deleteTracker = (id) => {
    return this.api.delete(`/api/trackings/${id}`);
  };
}

const trackingServices = new AuthService();
export default trackingServices;