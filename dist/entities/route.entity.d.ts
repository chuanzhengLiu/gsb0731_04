import { Wall } from './wall.entity';
import { User } from './user.entity';
import { Hold } from './hold.entity';
import { Ascent } from './ascent.entity';
import { GradeVote } from './grade-vote.entity';
export declare enum RouteType {
    LEAD = "lead",
    TOP_ROPE = "top_rope",
    BOULDER = "boulder",
    SPEED = "speed"
}
export declare enum RouteStatus {
    DRAFTING = "drafting",
    OPEN = "open",
    REMOVING = "removing",
    REMOVED = "removed"
}
export declare class Route {
    id: number;
    wall_id: number;
    name: string;
    type: RouteType;
    path_coords: object;
    grade: string;
    color: string;
    setter_id: number;
    status: RouteStatus;
    tags: string[];
    length: number;
    open_date: Date;
    planned_remove_date: Date;
    created_at: Date;
    updated_at: Date;
    wall: Wall;
    setter: User;
    holds: Hold[];
    ascents: Ascent[];
    gradeVotes: GradeVote[];
}
