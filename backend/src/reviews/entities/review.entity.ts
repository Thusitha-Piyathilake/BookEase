import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity/user.entity';
import { Service } from '../../services/entities/service.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int',
  })
  rating!: number;

  @Column({
    type: 'text',
  })
  comment!: string;

  @ManyToOne(
    () => User,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  customer!: User;

  @ManyToOne(
    () => User,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  provider!: User;

  @ManyToOne(
    () => Service,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  service!: Service;

  @ManyToOne(
    () => Booking,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  booking!: Booking;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}