/// <reference types="multer" />
import { Request, Response } from 'express';
import { DyanmicQuery } from '../../validators/query/product.query';
import { ProductRepository } from '../../repository/product/product.repository';
import { ProductService } from '../../services/product/product.service';
import { CustomRequest } from '../../types/custom-request.type';
export declare class ProductController {
    private readonly service;
    private readonly repository;
    constructor(service: ProductService, repository: ProductRepository);
    create(req: CustomRequest, res: Response, files: Express.Multer.File[]): Promise<Response<any, Record<string, any>>>;
    update(req: CustomRequest, res: Response, files: Express.Multer.File[]): Promise<Response<any, Record<string, any>>>;
    destroy(req: CustomRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    list(query: DyanmicQuery, res: Response): Promise<Response<any, Record<string, any>>>;
    detail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
