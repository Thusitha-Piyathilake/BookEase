import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

import { Review } from './entities/review.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review,
      Booking,
      Service,
      User,
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}