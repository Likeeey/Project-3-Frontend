import axios from "axios";
import authService from "./auth.service";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://project-3-backend-1q8n.onrender.com",
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