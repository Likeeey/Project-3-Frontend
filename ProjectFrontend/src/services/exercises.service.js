import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL:"https://project-3-backend-1q8n.onrender.com",
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
createExercise = (requestBody) => {
    return this.api.post("/api/exercise", requestBody);
  };

  // GET /api/exercises
  getAllExercises = () => {
    return this.api.get("/api/exercises");
  };

  // GET /api/exercises/:id
  getExercise = (id) => {
    return this.api.get(`/api/exercises/${id}`);
  };

  // PUT /api/exercises/:id
  updateExercise = (id, requestBody) => {
    return this.api.put(`/api/exercises/${id}`, requestBody);
  };

  // DELETE /api/exercises/:id
  deleteExercise = (id) => {
    return this.api.delete(`/api/exercises/${id}`);
  };
}

const exerciseService = new AuthService();
export default exerciseService;