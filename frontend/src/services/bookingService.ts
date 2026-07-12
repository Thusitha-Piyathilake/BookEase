import api from "../api/axios";

export interface Booking {
  id: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
  status: string;

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

const bookingService = {
  createBooking: async (
    data: CreateBookingDto
  ): Promise<Booking> => {
    const response = await api.post<Booking>(
      "/bookings",
      data
    );

    return response.data;
  },

  getMyBookings: async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(
      "/bookings/customer"
    );

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
};

export default bookingService;