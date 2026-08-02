import { Gym } from './gym.entity';
import { Ascent } from './ascent.entity';
import { GradeVote } from './grade-vote.entity';
import { Route } from './route.entity';
import { UserProfile } from './user-profile.entity';
import { OperationLog } from './operation-log.entity';
export declare enum UserRole {
    PLATFORM_ADMIN = "platform_admin",
    GYM_ADMIN = "gym_admin",
    SETTER = "setter",
    VERIFIED_CLIMBER = "verified_climber",
    GUEST = "guest"
}
export declare class User {
    id: number;
    phone: string;
    email: string;
    password_hash: string;
    name: string;
    role: UserRole;
    gym_id: number;
    verified_at: Date;
    rejected_at: Date | null;
    rejection_reason: string | null;
    created_at: Date;
    updated_at: Date;
    gym: Gym;
    ascents: Ascent[];
    gradeVotes: GradeVote[];
    routes: Route[];
    profile: UserProfile;
    operationLogs: OperationLog[];
}
