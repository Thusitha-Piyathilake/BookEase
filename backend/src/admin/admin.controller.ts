import {
  Controller,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { UserRole } from '../users/entities/user.entity/user.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  // ======================================
  // Dashboard
  // ======================================

  @Get('dashboard')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // ======================================
  // User Management
  // ======================================

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  getUserById(
    @Param('id') id: string,
  ) {
    return this.adminService.getUserById(id);
  }

  @Delete('users/:id')
  deleteUser(
    @Param('id') id: string,
  ) {
    return this.adminService.deleteUser(id);
  }

  // ======================================
  // Service Management
  // ======================================

  @Get('services')
  getAllServices() {
    return this.adminService.getAllServices();
  }

  @Delete('services/:id')
  deleteService(
    @Param('id') id: string,
  ) {
    return this.adminService.deleteService(id);
  }

  // ======================================
  // Review Management
  // ======================================

  @Get('reviews')
  getAllReviews() {
    return this.adminService.getAllReviews();
  }

  @Delete('reviews/:id')
  deleteReview(
    @Param('id') id: string,
  ) {
    return this.adminService.deleteReview(id);
  }
}