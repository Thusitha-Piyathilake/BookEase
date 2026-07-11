import api from "../api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  };
}

const authService = {
  login: async (
    data: LoginRequest
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    return response.data;
  },
};

export default authService;