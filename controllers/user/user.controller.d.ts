/// <reference types="multer" />
import { Request, Response } from 'express';
import { UserRepository } from '../../repository/user/user.repository';
import { LoginField, RegisterField, UpdateRoleField } from '../../validators/user/user.validator';
import { UserService } from '../../services/user/user.service';
import { DyanmicQuery } from '../../validators/query/product.query';
import { CustomRequest } from '../../types/custom-request.type';
export declare class UserController {
    private readonly repository;
    private readonly service;
    constructor(repository: UserRepository, service: UserService);
    login(req: Request, res: Response, body: LoginField): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response, body: RegisterField): Promise<Response<any, Record<string, any>>>;
    updateRole(req: CustomRequest, res: Response, body: UpdateRoleField): Promise<Response<any, Record<string, any>>>;
    reset(req: Request, res: Response): Response<any, Record<string, any>>;
    update(req: Request, res: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    destroy(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(query: DyanmicQuery, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
