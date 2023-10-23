/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { LoginField, RegisterField } from '../../validators/user/user.validator';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    jwtService: JwtService;
    constructor(jwtService: JwtService);
    private readonly regex;
    login(field: LoginField): Promise<{
        accessToken: string;
        status: HttpStatus;
    }>;
    create(field: RegisterField): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    update(public_id: string, field: {
        username: string;
        password: string;
    }, file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(public_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
