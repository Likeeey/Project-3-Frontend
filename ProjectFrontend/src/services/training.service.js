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

  // POST /api/exercise
    createTraining = (requestBody) => {
      return this.api.post("/api/training", requestBody);
    };

    // GET /api/exercises
    getAllTrainings = () => {
      return this.api.get("/api/trainings");
    };

    // GET /api/exercises/:id
    getTraining= (id) => {
      return this.api.get(`/api/trainings/${id}`);
    };

    // PUT /api/exercises/:id
    updateTraining = (id, requestBody) => {
      return this.api.put(`/api/trainings/${id}`, requestBody);
    };

    // DELETE /api/exercises/:id
    deleteTraining = (id) => {
      return this.api.delete(`/api/trainings/${id}`);
    };
  }

  const trainingServices = new AuthService();
  export default trainingServices;