import { User } from './user.entity';
export declare class UserProfile {
    id: number;
    user_id: number;
    climbing_since: number;
    preferred_style: string;
    height: number;
    ape_index: number;
    target_grade: string;
    user: User;
}
