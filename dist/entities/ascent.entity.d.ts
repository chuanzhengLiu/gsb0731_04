import { Route } from './route.entity';
import { User } from './user.entity';
export declare enum AscentType {
    FLASH = "flash",
    REDPOINT = "redpoint",
    ONSIGHT = "onsight",
    HIGH_POINT = "high_point",
    FALL = "fall"
}
export declare enum AscentVisibility {
    PRIVATE = "private",
    FRIENDS = "friends",
    PUBLIC = "public"
}
export declare class Ascent {
    id: number;
    route_id: number;
    user_id: number;
    ascent_type: AscentType;
    attempts: number;
    felt_grade: string;
    video_url: string;
    notes: string;
    visibility: AscentVisibility;
    created_at: Date;
    route: Route;
    user: User;
}
