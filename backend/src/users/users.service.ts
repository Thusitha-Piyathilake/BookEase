import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // ==========================
  // Remove password before returning
  // ==========================

  private sanitizeUser(user: User): User {
    delete (user as any).password;
    return user;
  }

  async create(
    userData: Partial<User>,
  ): Promise<User> {
    const user =
      this.usersRepository.create(userData);

    const savedUser =
      await this.usersRepository.save(user);

    return this.sanitizeUser(savedUser);
  }

  async findAll(): Promise<User[]> {
    const users =
      await this.usersRepository.find();

    return users.map((user) =>
      this.sanitizeUser(user),
    );
  }

  async findById(
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

    return this.sanitizeUser(user);
  }

  async findByEmail(
    email: string,
  ): Promise<User | null> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(
    id: string,
    data: Partial<User>,
  ): Promise<User> {
    const existingUser =
      await this.usersRepository.findOne({
        where: {
          id,
        },
      });

    if (!existingUser) {
      throw new NotFoundException(
        'User not found',
      );
    }

    existingUser.name =
      data.name ?? existingUser.name;

    existingUser.phone =
      data.phone ?? existingUser.phone;

    existingUser.address =
      data.address ?? existingUser.address;

    const updatedUser =
      await this.usersRepository.save(
        existingUser,
      );

    return this.sanitizeUser(updatedUser);
  }

  async remove(
    id: string,
  ): Promise<void> {
    await this.usersRepository.delete(id);
  }
}