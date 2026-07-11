import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { GetUser } from '../common/decorators/get-user.decorator';

import { UserRole } from '../users/entities/user.entity/user.entity';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  create(
    @Body() createServiceDto: CreateServiceDto,
    @GetUser() user: any,
  ) {
    return this.servicesService.create(
      createServiceDto,
      user.id,
    );
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('my-services')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  findMyServices(
    @GetUser() user: any,
  ) {
    return this.servicesService.findByProvider(user.id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(
      id,
      updateServiceDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.servicesService.remove(id);
  }
}