import api from "../api/axios";

export interface Booking {
  id: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  status: string;

  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  service: {
    id: string;
    title: string;
    price: number;
    imageUrl?: string;
    category: string;
  };
}

export interface CreateBookingDto {
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

export interface BookingQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

const bookingService = {
  // =========================
  // CUSTOMER
  // =========================

  createBooking: async (
    data: CreateBookingDto
  ): Promise<Booking> => {
    const response = await api.post<Booking>(
      "/bookings",
      data
    );

    return response.data;
  },

  getMyBookings: async (
    query?: BookingQuery
  ): Promise<Booking[]> => {
    const params = new URLSearchParams();

    if (query) {
      if (query.page !== undefined) params.append("page", String(query.page));
      if (query.limit !== undefined) params.append("limit", String(query.limit));
      if (query.search) params.append("search", query.search);
      if (query.status) params.append("status", query.status);
    }

    const url = `/bookings/customer${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get<Booking[]>(url);
    return response.data;
  },

  getUpcomingBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(
      "/bookings/customer/upcoming"
    );
    return response.data;
  },

  getBookingHistory: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(
      "/bookings/customer/history"
    );
    return response.data;
  },

  cancelBooking: async (
    id: string
  ): Promise<Booking> => {
    const response = await api.patch<Booking>(
      `/bookings/${id}/customer-cancel`
    );
    return response.data;
  },

  // =========================
  // PROVIDER  (FIXED)
  // =========================

  getProviderBookings: async (
    query?: BookingQuery
  ): Promise<Booking[]> => {
    const params = new URLSearchParams();

    if (query) {
      if (query.page !== undefined) params.append("page", String(query.page));
      if (query.limit !== undefined) params.append("limit", String(query.limit));
      if (query.search) params.append("search", query.search);
      if (query.status) params.append("status", query.status);
    }

    const url = `/bookings/provider${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get<Booking[]>(url);
    return response.data;
  },

  confirmBooking: async (
    id: string
  ): Promise<Booking> => {
    const response = await api.patch<Booking>(
      `/bookings/${id}/confirm`
    );
    return response.data;
  },

  providerCancelBooking: async (
    id: string
  ): Promise<Booking> => {
    const response = await api.patch<Booking>(
      `/bookings/${id}/cancel`
    );
    return response.data;
  },

  completeBooking: async (
    id: string
  ): Promise<Booking> => {
    const response = await api.patch<Booking>(
      `/bookings/${id}/complete`
    );
    return response.data;
  },
};

export default bookingService;