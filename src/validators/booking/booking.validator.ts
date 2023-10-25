import { IsDate, IsOptional, IsString } from 'class-validator';

export class BookingField {
  @IsString()
  token: string;

  @IsDate()
  day!: Date;

  @IsString()
  @IsOptional()
  desc!: string;
}
