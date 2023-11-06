import { Response } from 'express';
import { ChangePasswordField, LoginField, RegisterField } from '../../dto/user-dto/user-dto';
import { UserService } from '../../services/user-service/user-service';
import { CustomRequest } from '../../types/custom-request.type';
import { HistoryRepository } from '../../repository/history-repository/history-repository';
export declare class UserController {
    private readonly repository;
    private readonly service;
    private readonly logger;
    constructor(repository: HistoryRepository, service: UserService);
    login(body: LoginField, res: Response): Promise<Response<any, Record<string, any>>>;
    create(body: RegisterField, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: CustomRequest, body: RegisterField, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePassword(req: CustomRequest, body: ChangePasswordField, res: Response): Promise<Response<any, Record<string, any>>>;
    all(res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
