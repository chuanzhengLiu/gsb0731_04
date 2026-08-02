import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not, Like, Raw } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

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

    if (approved) {
      user.verified_at = new Date();
      // 通过时清掉历史驳回痕迹，避免会员端看到过期状态
      user.rejected_at = null;
      user.reject_reason = null;
      // 只把访客升级为认证会员，保留 setter/admin 等已被授予的角色
      if (user.role === UserRole.GUEST) {
        user.role = UserRole.VERIFIED_CLIMBER;
      }
    } else {
      // 驳回必须填原因（纯空格也不算），否则会员端只能看到被驳回却不知道为什么
      if (!reason || !reason.trim()) {
        throw new BadRequestException('驳回时必须填写原因');
      }
      // 驳回：记录时间和原因，不动 verified_at 和角色，仍可再次审核
      user.rejected_at = new Date();
      user.reject_reason = reason.trim();
    }

    return this.userRepository.save(user);
  }

  async getVerificationStatus(userId: number): Promise<{
    status: 'verified' | 'rejected' | 'pending';
    verified_at: Date | null;
    rejected_at: Date | null;
    reject_reason: string | null;
  }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const status = user.verified_at
      ? ('verified' as const)
      : user.rejected_at
        ? ('rejected' as const)
        : ('pending' as const);

    return {
      status,
      verified_at: user.verified_at ?? null,
      rejected_at: user.rejected_at ?? null,
      reject_reason: user.reject_reason ?? null,
    };
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
