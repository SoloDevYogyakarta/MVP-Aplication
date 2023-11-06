import { HttpStatus } from '@nestjs/common';
import { ChangePasswordField, LoginField, RegisterField } from '../../dto/user-dto/user-dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly jwtService;
    private readonly logger;
    constructor(jwtService: JwtService);
    login(body: LoginField): Promise<{
        status: HttpStatus;
        access_token: string;
    }>;
    create(body: RegisterField): Promise<{
        status: HttpStatus;
        message: string;
        result: import("../../database/entities/authenticate/user-entity/user-entity").UserInstance;
    }>;
    update(id: number, body: RegisterField): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    changePassword(id: number, body: ChangePasswordField): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    logout(id: number): Promise<{
        message: boolean;
        findOne: import("../../database/entities/authenticate/user-entity/user-entity").UserInstance;
    }>;
}
