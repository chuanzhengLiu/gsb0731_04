import { User } from './user.entity';
import { Wall } from './wall.entity';
export declare class Gym {
    id: number;
    name: string;
    address: string;
    area_sqm: number;
    admin_id: number;
    created_at: Date;
    updated_at: Date;
    admin: User;
    walls: Wall[];
    users: User[];
}
