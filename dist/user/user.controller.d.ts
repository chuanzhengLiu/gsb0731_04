import { UserService } from './user.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UserRole } from '../entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findByGym(gymId: number, role?: UserRole, verified?: string, search?: string): Promise<import("../entities/user.entity").User[]>;
    getPendingVerifications(gymId: number): Promise<import("../entities/user.entity").User[]>;
    verifyUser(id: number, verifyUserDto: VerifyUserDto): Promise<import("../entities/user.entity").User>;
    updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<import("../entities/user.entity").User>;
}
