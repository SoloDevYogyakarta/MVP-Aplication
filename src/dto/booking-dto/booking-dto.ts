import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookingField {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsDate()
  date: Date;

  @IsString()
  time: string;

  @IsNumber()
  @IsOptional()
  user_id?: number;
}
