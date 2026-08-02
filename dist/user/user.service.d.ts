import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByGym(gymId: number, filters?: {
        role?: UserRole;
        verified?: boolean;
        search?: string;
    }): Promise<User[]>;
    getPendingVerifications(gymId: number): Promise<User[]>;
    verifyUser(userId: number, approved: boolean, reason?: string): Promise<User>;
    updateRole(userId: number, role: UserRole): Promise<User>;
    findOne(id: number): Promise<User | null>;
}
