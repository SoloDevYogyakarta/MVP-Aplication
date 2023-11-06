import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHistoryField {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  file_desc?: string;

  @IsString()
  @IsOptional()
  browse?: string;
}
