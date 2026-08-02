import { Route } from './route.entity';
import { User } from './user.entity';
export declare class GradeVote {
    id: number;
    route_id: number;
    user_id: number;
    suggested_grade: string;
    created_at: Date;
    route: Route;
    user: User;
}
