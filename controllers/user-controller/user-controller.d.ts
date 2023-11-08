import { Response } from 'express';
import { ChangePasswordField, LoginField, RegisterField } from '../../dto/user-dto/user-dto';
import { UserRepository } from '../../repository/user-repository/user-repository';
import { UserService } from '../../services/user-service/user-service';
import { CustomRequest } from '../../types/custom-request.type';
export declare class UserController {
    private readonly repository;
    private readonly service;
    private readonly logger;
    constructor(repository: UserRepository, service: UserService);
    login(body: LoginField, res: Response): Promise<Response<any, Record<string, any>>>;
    create(body: RegisterField, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: CustomRequest, body: RegisterField, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePassword(req: CustomRequest, body: ChangePasswordField, res: Response): Promise<Response<any, Record<string, any>>>;
    all(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
