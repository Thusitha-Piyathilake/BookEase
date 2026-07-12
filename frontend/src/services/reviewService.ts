import api from "../api/axios";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;

  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };

  provider: {
    id: string;
    firstName: string;
    lastName: string;
  };

  service: {
    id: string;
    title: string;
    imageUrl?: string;
  };

  booking: {
    id: string;
  };
}

export interface CreateReviewDto {
  bookingId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

const reviewService = {
  // ==========================
  // CUSTOMER
  // ==========================

  createReview: async (
    data: CreateReviewDto
  ): Promise<Review> => {
    const response = await api.post<Review>(
      "/reviews",
      data
    );

    return response.data;
  },

  getMyReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>(
      "/reviews/customer"
    );

    return response.data;
  },

  updateReview: async (
    id: string,
    data: UpdateReviewDto
  ): Promise<Review> => {
    const response = await api.patch<Review>(
      `/reviews/${id}`,
      data
    );

    return response.data;
  },

  deleteReview: async (
    id: string
  ): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  },

  // ==========================
  // PROVIDER
  // ==========================

  getProviderReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>(
      "/reviews/provider"
    );

    return response.data;
  },

  // ==========================
  // PUBLIC
  // ==========================

  getServiceReviews: async (
    serviceId: string
  ): Promise<Review[]> => {
    const response = await api.get<Review[]>(
      `/reviews/service/${serviceId}`
    );

    return response.data;
  },

  getReviewsByProvider: async (
    providerId: string
  ): Promise<Review[]> => {
    const response = await api.get<Review[]>(
      `/reviews/provider/${providerId}`
    );

    return response.data;
  },

    getMyAverageRating: async (): Promise<{
    averageRating: number;
    totalReviews: number;
  }> => {
    const reviews = await api.get<Review[]>("/reviews/provider");

    if (reviews.data.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    const total = reviews.data.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return {
      averageRating: Number(
        (total / reviews.data.length).toFixed(1)
      ),
      totalReviews: reviews.data.length,
    };
  },

  getProviderAverageRating: async (
    providerId: string
  ): Promise<{
    averageRating: number;
    totalReviews: number;
  }> => {
    const response = await api.get(
      `/reviews/provider/${providerId}/average`
    );

    return response.data;
  },
};

export default reviewService;