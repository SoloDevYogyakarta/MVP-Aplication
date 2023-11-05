import { IsNumber, IsOptional, IsString } from 'class-validator';

class LoginField {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  secret: string = 'SECRET';
}

class RegisterField {
  @IsString()
  plat_number: string;

  @IsString()
  phone_number: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  motor: string;

  @IsNumber()
  year_production: number;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  confirmation: string;
}

class ChangePasswordField {
  @IsString()
  plat_number: string;

  @IsString()
  old_password: string;

  @IsString()
  password: string;

  @IsString()
  confirmation: string;
}

export { LoginField, RegisterField, ChangePasswordField };
