import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class PromoField {
  @IsNumber()
  main_stock!: number;

  @IsNumber()
  reverse_stock!: number;

  @IsNumber()
  value!: number;

  @IsDate()
  start_time!: Date;

  @IsDate()
  end_time!: Date;

  @IsString()
  @IsOptional()
  product_id?: string;
}
