import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  description!: string;

  @Column()
  category!: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column()
  duration!: number;

  @Column()
  location!: string;

  @Column({
    nullable: true,
  })
  imageUrl?: string;

  @ManyToOne(() => User, (user) => user.services, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'providerId',
  })
  provider!: User;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings!: Booking[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}