import api from "../api/axios";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
}

export interface UpdateProfileDto {
  name: string;
  phone?: string;
  address?: string;
}

const userService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(
      "/users/profile"
    );

    return response.data;
  },

  updateProfile: async (
    data: UpdateProfileDto
  ): Promise<User> => {
    const response = await api.patch<User>(
      "/users/profile",
      data
    );

    return response.data;
  },
};

export default userService;