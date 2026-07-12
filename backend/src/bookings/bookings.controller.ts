import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { QueryBookingDto } from './dto/query-booking.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

import { UserRole } from '../users/entities/user.entity/user.entity';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  // ==========================
  // CUSTOMER
  // ==========================

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  create(
    @Body() createBookingDto: CreateBookingDto,
    @GetUser() user: any,
  ) {
    return this.bookingsService.create(
      createBookingDto,
      user.id,
    );
  }

  @Get('customer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  findCustomerBookings(
    @GetUser() user: any,
    @Query() query: QueryBookingDto,
  ) {
    return this.bookingsService.findCustomerBookings(
      user.id,
      query,
    );
  }

  @Get('customer/upcoming')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  findCustomerUpcomingBookings(
    @GetUser() user: any,
  ) {
    return this.bookingsService.findCustomerUpcomingBookings(
      user.id,
    );
  }

  @Get('customer/history')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  findCustomerBookingHistory(
    @GetUser() user: any,
  ) {
    return this.bookingsService.findCustomerBookingHistory(
      user.id,
    );
  }

  @Patch(':id/customer-cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  customerCancelBooking(
    @Param('id') id: string,
    @GetUser() user: any,
  ) {
    return this.bookingsService.customerCancelBooking(
      id,
      user.id,
    );
  }

  // ==========================
  // PROVIDER
  // ==========================

  @Get('provider')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  findProviderBookings(
    @GetUser() user: any,
    @Query() query: QueryBookingDto,
  ) {
    return this.bookingsService.findProviderBookings(
      user.id,
      query,
    );
  }

  @Patch(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  confirmBooking(
    @Param('id') id: string,
    @GetUser() user: any,
  ) {
    return this.bookingsService.confirmBooking(
      id,
      user.id,
    );
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  cancelBooking(
    @Param('id') id: string,
    @GetUser() user: any,
  ) {
    return this.bookingsService.cancelBooking(
      id,
      user.id,
    );
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  completeBooking(
    @Param('id') id: string,
    @GetUser() user: any,
  ) {
    return this.bookingsService.completeBooking(
      id,
      user.id,
    );
  }

  // ==========================
  // GENERAL
  // ==========================

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(
      id,
      updateBookingDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.bookingsService.remove(id);
  }
}