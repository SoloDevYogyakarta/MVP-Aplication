import { HttpStatus } from '@nestjs/common';
export declare class OrderService {
    destroy(id: number): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
