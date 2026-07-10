import {
  IsUUID,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  serviceId!: string;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}