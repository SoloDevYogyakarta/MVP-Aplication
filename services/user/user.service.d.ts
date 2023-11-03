/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { LoginField, RegisterField, UpdateRoleField } from '../../validators/user/user.validator';
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
        result: import("../../database/entities/authenticates/user-entity/user-entity").UserInstance;
        status: HttpStatus;
        message: string;
    }>;
    update(public_id: string, field: {
        plat_number: string;
        password: string;
    }, file: Express.Multer.File): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(public_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    changeRole(public_id: string, body: UpdateRoleField): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    isAdmin(public_id: string): Promise<boolean>;
}
