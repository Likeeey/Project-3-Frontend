import axios from "axios";

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

  // GET /api/exercises
  getAllCoaches = () => {
    return this.api.get("/api/coaches");
  };

  // GET /api/exercises/:id
  getCoaches = (id) => {
    return this.api.get(`/api/coaches/${id}`);
  };
}

const coachService = new AuthService();
export default coachService;