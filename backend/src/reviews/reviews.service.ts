import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { Booking, BookingStatus } from '../bookings/entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // ============================================
  // CUSTOMER - CREATE REVIEW
  // ============================================

  async createReview(
    createReviewDto: CreateReviewDto,
    customerId: string,
  ): Promise<Review> {
    const booking = await this.bookingsRepository.findOne({
      where: {
        id: createReviewDto.bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    if (booking.customer.id !== customerId) {
      throw new ForbiddenException(
        'You cannot review this booking.',
      );
    }

    if (
      booking.status !==
      BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Only completed bookings can be reviewed.',
      );
    }

    const existingReview =
      await this.reviewsRepository.findOne({
        where: {
          booking: {
            id: booking.id,
          },
        },
      });

    if (existingReview) {
      throw new BadRequestException(
        'This booking has already been reviewed.',
      );
    }

    const review =
      this.reviewsRepository.create({
        rating: createReviewDto.rating,
        comment: createReviewDto.comment,
        booking,
        customer: booking.customer,
        provider: booking.provider,
        service: booking.service,
      });

    return this.reviewsRepository.save(review);
  }

    // ============================================
  // CUSTOMER - MY REVIEWS
  // ============================================

  async findCustomerReviews(
    customerId: string,
  ): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // ============================================
  // CUSTOMER - UPDATE REVIEW
  // ============================================

  async updateReview(
    reviewId: string,
    customerId: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review =
      await this.reviewsRepository.findOne({
        where: {
          id: reviewId,
        },
      });

    if (!review) {
      throw new NotFoundException(
        'Review not found',
      );
    }

    if (review.customer.id !== customerId) {
      throw new ForbiddenException(
        'You are not allowed to update this review.',
      );
    }

    Object.assign(
      review,
      updateReviewDto,
    );

    return this.reviewsRepository.save(
      review,
    );
  }

  // ============================================
  // CUSTOMER - DELETE REVIEW
  // ============================================

  async deleteReview(
    reviewId: string,
    customerId: string,
  ): Promise<void> {
    const review =
      await this.reviewsRepository.findOne({
        where: {
          id: reviewId,
        },
      });

    if (!review) {
      throw new NotFoundException(
        'Review not found',
      );
    }

    if (review.customer.id !== customerId) {
      throw new ForbiddenException(
        'You are not allowed to delete this review.',
      );
    }

    await this.reviewsRepository.delete(
      reviewId,
    );
  }

    // ============================================
  // PROVIDER - VIEW REVIEWS
  // ============================================

  async findProviderReviews(
    providerId: string,
  ): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: {
        provider: {
          id: providerId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // ============================================
  // PUBLIC - SERVICE REVIEWS
  // ============================================

  async findServiceReviews(
    serviceId: string,
  ): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: {
        service: {
          id: serviceId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // ============================================
  // PUBLIC - PROVIDER REVIEWS
  // ============================================

  async findReviewsByProvider(
    providerId: string,
  ): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: {
        provider: {
          id: providerId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // ============================================
  // PUBLIC - AVERAGE RATING
  // ============================================

  async getProviderAverageRating(
    providerId: string,
  ) {
    const reviews =
      await this.reviewsRepository.find({
        where: {
          provider: {
            id: providerId,
          },
        },
      });

    if (reviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    const total =
      reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );

    return {
      averageRating: Number(
        (total / reviews.length).toFixed(1),
      ),
      totalReviews: reviews.length,
    };
  }

  // ============================================
  // GENERAL
  // ============================================

  async findOne(
    id: string,
  ): Promise<Review> {
    const review =
      await this.reviewsRepository.findOne({
        where: {
          id,
        },
      });

    if (!review) {
      throw new NotFoundException(
        'Review not found',
      );
    }

    return review;
  }
}

