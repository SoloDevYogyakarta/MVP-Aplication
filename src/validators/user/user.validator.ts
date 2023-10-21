import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class LoginField {
  @IsString()
  token: string;

  @IsString()
  password: string;
}

export class RegisterField {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  password: string;

  @IsString()
  confirmation: string;

  @IsBoolean()
  @IsOptional()
  http?: boolean;
}

export class ResetField {
  @IsString()
  email: string;
}

export class UserUpdatedField {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
