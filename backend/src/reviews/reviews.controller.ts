import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';

import { UserRole } from '../users/entities/user.entity/user.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  // ==========================================
  // CUSTOMER
  // ==========================================

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  createReview(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: any,
  ) {
    return this.reviewsService.createReview(
      createReviewDto,
      user.id,
    );
  }

  @Get('customer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  findCustomerReviews(
    @GetUser() user: any,
  ) {
    return this.reviewsService.findCustomerReviews(
      user.id,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: any,
  ) {
    return this.reviewsService.updateReview(
      id,
      user.id,
      updateReviewDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  deleteReview(
    @Param('id') id: string,
    @GetUser() user: any,
  ) {
    return this.reviewsService.deleteReview(
      id,
      user.id,
    );
  }

  // ==========================================
  // PROVIDER
  // ==========================================

  @Get('provider')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  findProviderReviews(
    @GetUser() user: any,
  ) {
    return this.reviewsService.findProviderReviews(
      user.id,
    );
  }

  // ==========================================
  // PUBLIC
  // ==========================================

  @Get('service/:serviceId')
  findServiceReviews(
    @Param('serviceId') serviceId: string,
  ) {
    return this.reviewsService.findServiceReviews(
      serviceId,
    );
  }

  @Get('provider/:providerId')
  findReviewsByProvider(
    @Param('providerId') providerId: string,
  ) {
    return this.reviewsService.findReviewsByProvider(
      providerId,
    );
  }

  @Get('provider/:providerId/average')
  getProviderAverageRating(
    @Param('providerId') providerId: string,
  ) {
    return this.reviewsService.getProviderAverageRating(
      providerId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.reviewsService.findOne(id);
  }
}