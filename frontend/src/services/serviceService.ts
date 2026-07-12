import api from "../api/axios";

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  location: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceDto {
  title: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  location: string;
  imageUrl?: string;
}

const serviceService = {
  getAllServices: async (): Promise<Service[]> => {
    const response = await api.get<Service[]>("/services");
    return response.data;
  },

  getMyServices: async (): Promise<Service[]> => {
    const response = await api.get<Service[]>("/services/my-services");
    return response.data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const response = await api.get<Service>(`/services/${id}`);
    return response.data;
  },

  createService: async (
    data: CreateServiceDto
  ): Promise<Service> => {
    const response = await api.post<Service>(
      "/services",
      data
    );

    return response.data;
  },

  updateService: async (
    id: string,
    data: Partial<CreateServiceDto>
  ): Promise<Service> => {
    const response = await api.patch<Service>(
      `/services/${id}`,
      data
    );

    return response.data;
  },

  deleteService: async (
    id: string
  ): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};

export default serviceService;