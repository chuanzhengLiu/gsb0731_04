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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { phone, email, password, name } = registerDto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('手机号或邮箱至少需要提供一个');
        }
        if (phone) {
            const existingUserByPhone = await this.userRepository.findOne({
                where: { phone },
            });
            if (existingUserByPhone) {
                throw new common_1.BadRequestException('手机号已被注册');
            }
        }
        if (email) {
            const existingUserByEmail = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUserByEmail) {
                throw new common_1.BadRequestException('邮箱已被注册');
            }
        }
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const user = new user_entity_1.User();
        user.phone = (phone || null);
        user.email = (email || null);
        user.password_hash = passwordHash;
        user.name = name;
        user.role = user_entity_1.UserRole.GUEST;
        const savedUser = await this.userRepository.save(user);
        const tokens = await this.generateTokens(savedUser.id);
        return {
            user: this.sanitizeUser(savedUser),
            ...tokens,
        };
    }
    async login(loginDto) {
        const { phone, email, password } = loginDto;
        if (!phone && !email) {
            throw new common_1.BadRequestException('手机号或邮箱至少需要提供一个');
        }
        let user = null;
        if (phone) {
            user = await this.userRepository.findOne({ where: { phone } });
        }
        else if (email) {
            user = await this.userRepository.findOne({ where: { email } });
        }
        if (!user) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        const tokens = await this.generateTokens(user.id);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_SECRET || 'default_secret_key',
            });
            if (payload.type !== 'refresh') {
                throw new common_1.UnauthorizedException('无效的刷新令牌');
            }
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('用户不存在');
            }
            const tokens = await this.generateTokens(user.id);
            return {
                user: this.sanitizeUser(user),
                ...tokens,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('无效的刷新令牌');
        }
    }
    async logout() {
        return { message: '登出成功' };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在');
        }
        return this.sanitizeUser(user);
    }
    async updateProfile(userId, updateData) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在');
        }
        const allowedFields = ['name', 'phone', 'email', 'avatar', 'bio'];
        for (const field of allowedFields) {
            if (updateData[field] !== undefined) {
                user[field] = updateData[field];
            }
        }
        const savedUser = await this.userRepository.save(user);
        return this.sanitizeUser(savedUser);
    }
    async generateTokens(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, type: 'access', role: user?.role, gym_id: user?.gym_id }, { expiresIn: '2h' }),
            this.jwtService.signAsync({ sub: userId, type: 'refresh', role: user?.role, gym_id: user?.gym_id }, { expiresIn: '7d' }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    sanitizeUser(user) {
        const { password_hash, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map