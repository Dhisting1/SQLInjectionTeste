import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user?: { id: number; username: string; password: string };
}

const API_URL = "http://localhost:3001/login";

class LoginService {
  // Responsabilidade única: comunicar com o backend
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }
}

export default LoginService;
