import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHistoryField {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
