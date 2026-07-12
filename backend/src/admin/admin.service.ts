import {Injectable,NotFoundException,} from '@nestjs/common';import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity/user.entity';
import { Service } from '../services/entities/service.entity';
import {
  Booking,
  BookingStatus,
} from '../bookings/entities/booking.entity';
import { Review } from '../reviews/entities/review.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,

    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async getDashboardStats() {
    const [
      totalUsers,
      customers,
      providers,
      admins,
      totalServices,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalReviews,
    ] = await Promise.all([
      this.usersRepository.count(),

      this.usersRepository.count({
        where: {
          role: UserRole.CUSTOMER,
        },
      }),

      this.usersRepository.count({
        where: {
          role: UserRole.PROVIDER,
        },
      }),

      this.usersRepository.count({
        where: {
          role: UserRole.ADMIN,
        },
      }),

      this.servicesRepository.count(),

      this.bookingsRepository.count(),

      this.bookingsRepository.count({
        where: {
          status: BookingStatus.PENDING,
        },
      }),

      this.bookingsRepository.count({
        where: {
          status: BookingStatus.CONFIRMED,
        },
      }),

      this.bookingsRepository.count({
        where: {
          status: BookingStatus.COMPLETED,
        },
      }),

      this.bookingsRepository.count({
        where: {
          status: BookingStatus.CANCELLED,
        },
      }),

      this.reviewsRepository.count(),
    ]);

    return {
      totalUsers,
      customers,
      providers,
      admins,

      totalServices,

      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,

      totalReviews,
    };
  }

  // ======================================
// USER MANAGEMENT
// ======================================

async getAllUsers(): Promise<User[]> {
  return this.usersRepository.find({
    order: {
      createdAt: 'DESC',
    },
  });
}

async getUserById(
  id: string,
): Promise<User> {
  const user =
    await this.usersRepository.findOne({
      where: {
        id,
      },
    });

  if (!user) {
    throw new NotFoundException(
      'User not found',
    );
  }

  return user;
}

async deleteUser(
  id: string,
): Promise<{ message: string }> {
  const user =
    await this.usersRepository.findOne({
      where: {
        id,
      },
    });

  if (!user) {
    throw new NotFoundException(
      'User not found',
    );
  }

  await this.usersRepository.remove(user);

  return {
    message: 'User deleted successfully',
  };
}

  // ======================================
  // SERVICE MANAGEMENT
  // ======================================

  async getAllServices(): Promise<Service[]> {
    return this.servicesRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteService(
    id: string,
  ): Promise<{ message: string }> {
    const service =
      await this.servicesRepository.findOne({
        where: {
          id,
        },
      });

    if (!service) {
      throw new NotFoundException(
        'Service not found',
      );
    }

    await this.servicesRepository.remove(
      service,
    );

    return {
      message:
        'Service deleted successfully',
    };
  }

  // ======================================
  // REVIEW MANAGEMENT
  // ======================================

  async getAllReviews(): Promise<Review[]> {
    return this.reviewsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteReview(
    id: string,
  ): Promise<{ message: string }> {
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

    await this.reviewsRepository.remove(
      review,
    );

    return {
      message:
        'Review deleted successfully',
    };
  }


}