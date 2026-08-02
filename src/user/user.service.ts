import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not, Like, Raw } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { applyVerificationDecision } from '../common/verification-rules';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findByGym(
    gymId: number,
    filters?: {
      role?: UserRole;
      verified?: boolean;
      search?: string;
    },
  ): Promise<User[]> {
    const where: any = { gym_id: gymId };

    if (filters?.role) {
      where.role = filters.role;
    }

    if (filters?.verified !== undefined) {
      if (filters.verified) {
        where.verified_at = Not(IsNull());
      } else {
        where.verified_at = IsNull();
      }
    }

    if (filters?.search) {
      where.name = Like(`%${filters.search}%`);
    }

    return this.userRepository.find({
      where,
      order: { created_at: 'DESC' },
    });
  }

  getPendingVerifications(gymId: number): Promise<User[]> {
    return this.userRepository.find({
      where: {
        gym_id: gymId,
        verified_at: IsNull(),
        rejected_at: IsNull(),
        role: Not(UserRole.GUEST),
      },
      order: { created_at: 'ASC' },
    });
  }

  async verifyUser(userId: number, approved: boolean, reason?: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Approve/reject state transition lives in verification-rules (single source
    // of truth, unit-tested) so it can't be accidentally regressed here.
    applyVerificationDecision(user as any, approved, reason, UserRole.VERIFIED_CLIMBER);

    return this.userRepository.save(user);
  }

  async updateRole(userId: number, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    user.role = role;
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
