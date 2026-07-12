import api from "../api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "CUSTOMER" | "PROVIDER";
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

  register: async (
    data: RegisterRequest
  ): Promise<any> => {
    const response = await api.post(
      "/auth/register",
      data
    );

    return response.data;
  },
};

export default authService;