import { Request, Response } from 'express';
export declare class PromoController {
    created(req: Request, res: Response): Response<any, Record<string, any>>;
    updated(req: Request, res: Response): Response<any, Record<string, any>>;
    list(req: Request, res: Response): Response<any, Record<string, any>>;
    detail(req: Request, res: Response): Response<any, Record<string, any>>;
    destory(req: Request, res: Response): Response<any, Record<string, any>>;
}
