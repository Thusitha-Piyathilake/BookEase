import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity/user.entity';
import { QueryBookingDto } from './dto/query-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    customerId: string,
  ): Promise<Booking> {
    const customer = await this.usersRepository.findOne({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const service = await this.servicesRepository.findOne({
      where: { id: createBookingDto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // ==========================================
    // Prevent duplicate bookings
    // ==========================================

    const existingBooking =
      await this.bookingsRepository.findOne({
        where: {
          customer: {
            id: customerId,
          },
          service: {
            id: service.id,
          },
          bookingDate: createBookingDto.bookingDate,
          bookingTime: createBookingDto.bookingTime,
          status: In([
            BookingStatus.PENDING,
            BookingStatus.CONFIRMED,
          ]),
        },
      });

    if (existingBooking) {
      throw new ConflictException(
        'You already have a booking for this service at the selected date and time.',
      );
    }

    const booking = this.bookingsRepository.create({
      bookingDate: createBookingDto.bookingDate,
      bookingTime: createBookingDto.bookingTime,
      notes: createBookingDto.notes,
      status: BookingStatus.PENDING,
      customer,
      provider: service.provider,
      service,
    });

    return await this.bookingsRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    await this.findOne(id);

    await this.bookingsRepository.update(id, updateBookingDto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.bookingsRepository.delete(id);
  }

  // ===============================
  // Customer Features
  // ===============================

  async findCustomerBookings(
  customerId: string,
  query: QueryBookingDto,
): Promise<Booking[]> {
  const {
    search,
    status,
    page = 1,
    limit = 10,
  } = query;

  const qb =
    this.bookingsRepository.createQueryBuilder(
      'booking',
    );

  qb.leftJoinAndSelect(
    'booking.customer',
    'customer',
  );

  qb.leftJoinAndSelect(
    'booking.provider',
    'provider',
  );

  qb.leftJoinAndSelect(
    'booking.service',
    'service',
  );

  qb.where('customer.id = :customerId', {
    customerId,
  });

  if (status) {
    qb.andWhere(
      'booking.status = :status',
      {
        status,
      },
    );
  }

  if (search) {
    qb.andWhere(
      `(service.title ILIKE :search
        OR service.category ILIKE :search
        OR provider.name ILIKE :search)`,
      {
        search: `%${search}%`,
      },
    );
  }

  qb.orderBy(
    'booking.bookingDate',
    'DESC',
  );

  qb.addOrderBy(
    'booking.bookingTime',
    'DESC',
  );

  qb.skip((page - 1) * limit);

  qb.take(limit);

  return qb.getMany();
}

  async findCustomerUpcomingBookings(
    customerId: string,
  ): Promise<Booking[]> {
    return this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.provider', 'provider')
      .leftJoinAndSelect('booking.service', 'service')
      .where('customer.id = :customerId', {
        customerId,
      })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [
          BookingStatus.PENDING,
          BookingStatus.CONFIRMED,
        ],
      })
      .orderBy('booking.bookingDate', 'ASC')
      .addOrderBy('booking.bookingTime', 'ASC')
      .getMany();
  }

  async findCustomerBookingHistory(
    customerId: string,
  ): Promise<Booking[]> {
    return this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.customer', 'customer')
      .leftJoinAndSelect('booking.provider', 'provider')
      .leftJoinAndSelect('booking.service', 'service')
      .where('customer.id = :customerId', {
        customerId,
      })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [
          BookingStatus.COMPLETED,
          BookingStatus.CANCELLED,
        ],
      })
      .orderBy('booking.bookingDate', 'DESC')
      .addOrderBy('booking.bookingTime', 'DESC')
      .getMany();
  }

  async customerCancelBooking(
    bookingId: string,
    customerId: string,
  ): Promise<Booking> {
    const booking = await this.findOne(bookingId);

    if (booking.customer.id !== customerId) {
      throw new ForbiddenException(
        'You are not allowed to cancel this booking.',
      );
    }

    booking.status = BookingStatus.CANCELLED;

    return this.bookingsRepository.save(booking);
  }

  // ===============================
  // Provider Features
  // ===============================

  async findProviderBookings(
  providerId: string,
  query: QueryBookingDto,
): Promise<Booking[]> {
  const {
    search,
    status,
    page = 1,
    limit = 10,
  } = query;

  const qb =
    this.bookingsRepository.createQueryBuilder(
      'booking',
    );

  qb.leftJoinAndSelect(
    'booking.customer',
    'customer',
  );

  qb.leftJoinAndSelect(
    'booking.provider',
    'provider',
  );

  qb.leftJoinAndSelect(
    'booking.service',
    'service',
  );

  qb.where('provider.id = :providerId', {
    providerId,
  });

  if (status) {
    qb.andWhere(
      'booking.status = :status',
      {
        status,
      },
    );
  }

  if (search) {
    qb.andWhere(
      `(customer.name ILIKE :search
        OR service.title ILIKE :search
        OR service.category ILIKE :search)`,
      {
        search: `%${search}%`,
      },
    );
  }

  qb.orderBy(
    'booking.bookingDate',
    'DESC',
  );

  qb.addOrderBy(
    'booking.bookingTime',
    'DESC',
  );

  qb.skip((page - 1) * limit);

  qb.take(limit);

  return qb.getMany();
}

  async confirmBooking(
    bookingId: string,
    providerId: string,
  ): Promise<Booking> {
    const booking = await this.findOne(bookingId);

    if (booking.provider.id !== providerId) {
      throw new ForbiddenException(
        'You are not allowed to confirm this booking.',
      );
    }

    booking.status = BookingStatus.CONFIRMED;

    return this.bookingsRepository.save(booking);
  }

  async cancelBooking(
    bookingId: string,
    providerId: string,
  ): Promise<Booking> {
    const booking = await this.findOne(bookingId);

    if (booking.provider.id !== providerId) {
      throw new ForbiddenException(
        'You are not allowed to cancel this booking.',
      );
    }

    booking.status = BookingStatus.CANCELLED;

    return this.bookingsRepository.save(booking);
  }

  async completeBooking(
    bookingId: string,
    providerId: string,
  ): Promise<Booking> {
    const booking = await this.findOne(bookingId);

    if (booking.provider.id !== providerId) {
      throw new ForbiddenException(
        'You are not allowed to complete this booking.',
      );
    }

    booking.status = BookingStatus.COMPLETED;

    return this.bookingsRepository.save(booking);
  }
}