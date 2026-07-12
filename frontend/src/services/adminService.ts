import api from "../api/axios";

// =========================
// Dashboard
// =========================

export interface DashboardStats {
  totalUsers: number;
  customers: number;
  providers: number;
  admins: number;

  totalServices: number;

  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;

  totalReviews: number;
}

// =========================
// User
// =========================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  createdAt: string;
}

// =========================
// Service
// =========================

export interface AdminServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: number;
  price: number;
  imageUrl?: string;

  provider: {
    id: string;
    name: string;
    email: string;
  };

  createdAt: string;
}

// =========================
// Review
// =========================

export interface AdminReview {
  id: string;

  rating: number;
  comment: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  provider: {
    id: string;
    name: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
  };

  createdAt: string;
}

// =========================
// API
// =========================

const adminService = {
  // Dashboard

  getDashboard: async (): Promise<DashboardStats> => {
    const response = await api.get(
      "/admin/dashboard"
    );

    return response.data;
  },

  // Users

  getUsers: async (): Promise<AdminUser[]> => {
    const response = await api.get(
      "/admin/users"
    );

    return response.data;
  },

  deleteUser: async (
    id: string
  ) => {
    const response = await api.delete(
      `/admin/users/${id}`
    );

    return response.data;
  },

  // Services

  getServices: async (): Promise<AdminServiceItem[]> => {
    const response = await api.get(
      "/admin/services"
    );

    return response.data;
  },

  deleteService: async (
    id: string
  ) => {
    const response = await api.delete(
      `/admin/services/${id}`
    );

    return response.data;
  },

  // Reviews

  getReviews: async (): Promise<AdminReview[]> => {
    const response = await api.get(
      "/admin/reviews"
    );

    return response.data;
  },

  deleteReview: async (
    id: string
  ) =>{
    const response = await api.delete(
      `/admin/reviews/${id}`
    );

    return response.data;
  },
};

export default adminService;