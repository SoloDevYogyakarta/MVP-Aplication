import { HttpStatus } from '@nestjs/common';
export declare class HistoryService {
    destroy(public_id: string, user_id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    isAdmin(public_id: string): Promise<void>;
}
