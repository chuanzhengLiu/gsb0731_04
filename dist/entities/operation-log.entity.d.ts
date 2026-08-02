import { User } from './user.entity';
export declare class OperationLog {
    id: number;
    user_id: number;
    action: string;
    target_type: string;
    target_id: number;
    details: object;
    ip_address: string;
    created_at: Date;
    user: User;
}
