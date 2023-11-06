import { IsDate, IsNumber, IsString } from 'class-validator';

export class PromoField {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
