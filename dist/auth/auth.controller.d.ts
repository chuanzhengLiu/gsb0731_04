import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: number;
            phone: string;
            email: string;
            name: string;
            role: import("../entities/user.entity").UserRole;
            gym_id: number;
            verified_at: Date;
            rejected_at: Date | null;
            reject_reason: string | null;
            created_at: Date;
            updated_at: Date;
            gym: import("../entities/gym.entity").Gym;
            ascents: import("../entities/ascent.entity").Ascent[];
            gradeVotes: import("../entities/grade-vote.entity").GradeVote[];
            routes: import("../entities/route.entity").Route[];
            profile: import("../entities/user-profile.entity").UserProfile;
            operationLogs: import("../entities/operation-log.entity").OperationLog[];
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: number;
            phone: string;
            email: string;
            name: string;
            role: import("../entities/user.entity").UserRole;
            gym_id: number;
            verified_at: Date;
            rejected_at: Date | null;
            reject_reason: string | null;
            created_at: Date;
            updated_at: Date;
            gym: import("../entities/gym.entity").Gym;
            ascents: import("../entities/ascent.entity").Ascent[];
            gradeVotes: import("../entities/grade-vote.entity").GradeVote[];
            routes: import("../entities/route.entity").Route[];
            profile: import("../entities/user-profile.entity").UserProfile;
            operationLogs: import("../entities/operation-log.entity").OperationLog[];
        };
    }>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: number;
            phone: string;
            email: string;
            name: string;
            role: import("../entities/user.entity").UserRole;
            gym_id: number;
            verified_at: Date;
            rejected_at: Date | null;
            reject_reason: string | null;
            created_at: Date;
            updated_at: Date;
            gym: import("../entities/gym.entity").Gym;
            ascents: import("../entities/ascent.entity").Ascent[];
            gradeVotes: import("../entities/grade-vote.entity").GradeVote[];
            routes: import("../entities/route.entity").Route[];
            profile: import("../entities/user-profile.entity").UserProfile;
            operationLogs: import("../entities/operation-log.entity").OperationLog[];
        };
    }>;
    logout(): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        phone: string;
        email: string;
        name: string;
        role: import("../entities/user.entity").UserRole;
        gym_id: number;
        verified_at: Date;
        rejected_at: Date | null;
        reject_reason: string | null;
        created_at: Date;
        updated_at: Date;
        gym: import("../entities/gym.entity").Gym;
        ascents: import("../entities/ascent.entity").Ascent[];
        gradeVotes: import("../entities/grade-vote.entity").GradeVote[];
        routes: import("../entities/route.entity").Route[];
        profile: import("../entities/user-profile.entity").UserProfile;
        operationLogs: import("../entities/operation-log.entity").OperationLog[];
    }>;
    updateProfile(req: any, updateData: any): Promise<{
        id: number;
        phone: string;
        email: string;
        name: string;
        role: import("../entities/user.entity").UserRole;
        gym_id: number;
        verified_at: Date;
        rejected_at: Date | null;
        reject_reason: string | null;
        created_at: Date;
        updated_at: Date;
        gym: import("../entities/gym.entity").Gym;
        ascents: import("../entities/ascent.entity").Ascent[];
        gradeVotes: import("../entities/grade-vote.entity").GradeVote[];
        routes: import("../entities/route.entity").Route[];
        profile: import("../entities/user-profile.entity").UserProfile;
        operationLogs: import("../entities/operation-log.entity").OperationLog[];
    }>;
}
