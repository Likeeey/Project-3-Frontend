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

// POST /api/members
createMember = (requestBody) => {
    return this.api.post("/api/memberresults", requestBody);
  };

  // GET /api/members
  getAllMembers = () => {
    return this.api.get("/api/membersresults");
  };

  // GET /api/members/:id
  getMember = (id) => {
    return this.api.get(`/api/membersresults/${id}`);
  };

  // PUT /api/members/:id
  updateMember = (id, requestBody) => {
    return this.api.put(`/api/membersresults/${id}`, requestBody);
  };

  // DELETE /api/members/:id
  deleteMember = (id) => {
    return this.api.delete(`/api/membersresults/${id}`);
  };
}

const memberService = new AuthService();
export default memberService;