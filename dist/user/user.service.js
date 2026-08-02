"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findByGym(gymId, filters) {
        const where = { gym_id: gymId };
        if (filters?.role) {
            where.role = filters.role;
        }
        if (filters?.verified !== undefined) {
            if (filters.verified) {
                where.verified_at = (0, typeorm_2.Not)((0, typeorm_2.IsNull)());
            }
            else {
                where.verified_at = (0, typeorm_2.IsNull)();
            }
        }
        if (filters?.search) {
            where.name = (0, typeorm_2.Like)(`%${filters.search}%`);
        }
        return this.userRepository.find({
            where,
            order: { created_at: 'DESC' },
        });
    }
    getPendingVerifications(gymId) {
        return this.userRepository.find({
            where: {
                gym_id: gymId,
                verified_at: (0, typeorm_2.IsNull)(),
                role: (0, typeorm_2.Not)(user_entity_1.UserRole.GUEST),
            },
            order: { created_at: 'ASC' },
        });
    }
    async verifyUser(userId, approved, reason) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        if (approved) {
            user.verified_at = new Date();
            user.rejected_at = null;
            user.reject_reason = null;
            if (user.role === user_entity_1.UserRole.GUEST) {
                user.role = user_entity_1.UserRole.VERIFIED_CLIMBER;
            }
        }
        else {
            if (!reason || !reason.trim()) {
                throw new common_1.BadRequestException('驳回时必须填写原因');
            }
            user.rejected_at = new Date();
            user.reject_reason = reason.trim();
        }
        return this.userRepository.save(user);
    }
    async getVerificationStatus(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const status = user.verified_at
            ? 'verified'
            : user.rejected_at
                ? 'rejected'
                : 'pending';
        return {
            status,
            verified_at: user.verified_at ?? null,
            rejected_at: user.rejected_at ?? null,
            reject_reason: user.reject_reason ?? null,
        };
    }
    async updateRole(userId, role) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        user.role = role;
        return this.userRepository.save(user);
    }
    findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map