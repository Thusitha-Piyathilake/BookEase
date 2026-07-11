import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity/user.entity';

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
  ): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      order: {
        bookingDate: 'ASC',
        bookingTime: 'ASC',
      },
    });
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
  ): Promise<Booking[]> {
    return this.bookingsRepository.find({
      where: {
        provider: {
          id: providerId,
        },
      },
      order: {
        bookingDate: 'ASC',
        bookingTime: 'ASC',
      },
    });
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