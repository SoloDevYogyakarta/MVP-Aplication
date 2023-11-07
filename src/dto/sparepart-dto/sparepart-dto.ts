import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SparepartField {
  @IsString()
  text: string;

  @IsNumber()
  @IsOptional()
  id?: number;
}
