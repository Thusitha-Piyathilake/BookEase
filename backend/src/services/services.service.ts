import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,

    private readonly usersService: UsersService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    providerId: string,
  ): Promise<Service> {
    const provider = await this.usersService.findById(providerId);

    const service = this.servicesRepository.create({
      ...createServiceDto,
      provider,
    });

    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    await this.findOne(id);

    await this.servicesRepository.update(id, updateServiceDto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.servicesRepository.delete(id);
  }

  async findByProvider(providerId: string): Promise<Service[]> {
    return this.servicesRepository.find({
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
}