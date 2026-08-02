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
var SeedsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const wall_entity_1 = require("../entities/wall.entity");
const route_entity_1 = require("../entities/route.entity");
const hold_entity_1 = require("../entities/hold.entity");
const ascent_entity_1 = require("../entities/ascent.entity");
const grade_vote_entity_1 = require("../entities/grade-vote.entity");
const user_profile_entity_1 = require("../entities/user-profile.entity");
let SeedsService = SeedsService_1 = class SeedsService {
    constructor(userRepository, gymRepository, wallRepository, routeRepository, holdRepository, ascentRepository, gradeVoteRepository, userProfileRepository) {
        this.userRepository = userRepository;
        this.gymRepository = gymRepository;
        this.wallRepository = wallRepository;
        this.routeRepository = routeRepository;
        this.holdRepository = holdRepository;
        this.ascentRepository = ascentRepository;
        this.gradeVoteRepository = gradeVoteRepository;
        this.userProfileRepository = userProfileRepository;
        this.logger = new common_1.Logger(SeedsService_1.name);
    }
    async run() {
        this.logger.log('开始播种种子数据...');
        try {
            const admin = await this.createPlatformAdmin();
            this.logger.log('平台管理员创建完成');
            const gymAdmin = await this.createGymAdmin();
            this.logger.log('岩馆馆长创建完成');
            const setters = await this.createSetters();
            this.logger.log('定线员创建完成');
            const climbers = await this.createClimbers();
            this.logger.log('认证攀岩者创建完成');
            const gym = await this.createGym(gymAdmin.id);
            this.logger.log('岩馆创建完成');
            const walls = await this.createWalls(gym.id);
            this.logger.log('岩壁创建完成');
            const routes = await this.createRoutes(walls, setters);
            this.logger.log('线路创建完成');
            await this.createHolds(routes);
            this.logger.log('手点创建完成');
            await this.createAscents(climbers, routes);
            this.logger.log('攀爬记录创建完成');
            await this.createGradeVotes(climbers, routes);
            this.logger.log('难度投票创建完成');
            this.logger.log('种子数据播种完成！');
        }
        catch (error) {
            this.logger.error('种子数据播种失败', error);
            throw error;
        }
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 12);
    }
    async createPlatformAdmin() {
        const existing = await this.userRepository.findOne({
            where: { email: 'admin@test.com' },
        });
        if (existing)
            return existing;
        const user = new user_entity_1.User();
        user.email = 'admin@test.com';
        user.password_hash = await this.hashPassword('admin123456');
        user.name = '平台管理员';
        user.role = user_entity_1.UserRole.PLATFORM_ADMIN;
        user.verified_at = new Date();
        const saved = await this.userRepository.save(user);
        await this.createUserProfile(saved.id);
        return saved;
    }
    async createGymAdmin() {
        const existing = await this.userRepository.findOne({
            where: { email: 'admin@gym1.com' },
        });
        if (existing)
            return existing;
        const user = new user_entity_1.User();
        user.email = 'admin@gym1.com';
        user.password_hash = await this.hashPassword('admin123456');
        user.name = '岩馆馆长';
        user.role = user_entity_1.UserRole.GYM_ADMIN;
        user.verified_at = new Date();
        const saved = await this.userRepository.save(user);
        await this.createUserProfile(saved.id);
        return saved;
    }
    async createSetters() {
        const setters = [];
        for (let i = 1; i <= 2; i++) {
            const email = `setter${i}@test.com`;
            const existing = await this.userRepository.findOne({ where: { email } });
            if (existing) {
                setters.push(existing);
                continue;
            }
            const user = new user_entity_1.User();
            user.email = email;
            user.password_hash = await this.hashPassword('test123456');
            user.name = `定线员${i}`;
            user.role = user_entity_1.UserRole.SETTER;
            user.verified_at = new Date();
            const saved = await this.userRepository.save(user);
            await this.createUserProfile(saved.id);
            setters.push(saved);
        }
        return setters;
    }
    async createClimbers() {
        const climbers = [];
        for (let i = 1; i <= 5; i++) {
            const email = `climber${i}@test.com`;
            const existing = await this.userRepository.findOne({ where: { email } });
            if (existing) {
                climbers.push(existing);
                continue;
            }
            const user = new user_entity_1.User();
            user.email = email;
            user.password_hash = await this.hashPassword('test123456');
            user.name = `攀岩者${i}`;
            user.role = user_entity_1.UserRole.VERIFIED_CLIMBER;
            user.verified_at = new Date();
            const saved = await this.userRepository.save(user);
            await this.createUserProfile(saved.id);
            climbers.push(saved);
        }
        return climbers;
    }
    async createUserProfile(userId) {
        const existing = await this.userProfileRepository.findOne({
            where: { user_id: userId },
        });
        if (existing)
            return;
        const profile = new user_profile_entity_1.UserProfile();
        profile.user_id = userId;
        profile.climbing_since = 2018 + Math.floor(Math.random() * 5);
        profile.preferred_style = ['lead', 'boulder', 'top_rope'][Math.floor(Math.random() * 3)];
        profile.height = 160 + Math.floor(Math.random() * 30);
        profile.ape_index = -2 + Math.random() * 6;
        profile.target_grade = ['5.10a', '5.11a', '5.12a', 'V3', 'V5'][Math.floor(Math.random() * 5)];
        await this.userProfileRepository.save(profile);
    }
    async createGym(adminId) {
        const existing = await this.gymRepository.findOne({
            where: { name: '磐石攀岩馆' },
        });
        if (existing)
            return existing;
        const gym = new gym_entity_1.Gym();
        gym.name = '磐石攀岩馆';
        gym.address = '北京市朝阳区攀岩路88号';
        gym.area_sqm = 800;
        gym.admin_id = adminId;
        return this.gymRepository.save(gym);
    }
    async createWalls(gymId) {
        const wallNames = ['先锋墙', '抱石墙', '速度墙'];
        const walls = [];
        for (const name of wallNames) {
            const existing = await this.wallRepository.findOne({
                where: { gym_id: gymId, name },
            });
            if (existing) {
                walls.push(existing);
                continue;
            }
            const wall = new wall_entity_1.Wall();
            wall.gym_id = gymId;
            wall.name = name;
            wall.polygon_coords = [
                { x: 0, y: 0 },
                { x: 100, y: 0 },
                { x: 100, y: 200 },
                { x: 0, y: 200 },
            ];
            walls.push(await this.wallRepository.save(wall));
        }
        return walls;
    }
    async createRoutes(walls, setters) {
        const routeTypes = [route_entity_1.RouteType.LEAD, route_entity_1.RouteType.BOULDER, route_entity_1.RouteType.TOP_ROPE, route_entity_1.RouteType.SPEED];
        const grades = ['5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a', '5.11b', '5.11c', '5.11d', '5.12a', 'V1', 'V2', 'V3', 'V4', 'V5'];
        const colors = ['红色', '蓝色', '绿色', '黄色', '黑色', '白色', '粉色', '紫色', '橙色'];
        const routes = [];
        for (let i = 1; i <= 15; i++) {
            const wallIndex = (i - 1) % walls.length;
            const wall = walls[wallIndex];
            const setter = setters[i % setters.length];
            const routeName = `线路${i}`;
            const existing = await this.routeRepository.findOne({
                where: { wall_id: wall.id, name: routeName },
            });
            if (existing) {
                routes.push(existing);
                continue;
            }
            const route = new route_entity_1.Route();
            route.wall_id = wall.id;
            route.name = routeName;
            route.type = routeTypes[i % routeTypes.length];
            route.grade = grades[i % grades.length];
            route.color = colors[i % colors.length];
            route.setter_id = setter.id;
            route.status = route_entity_1.RouteStatus.OPEN;
            route.tags = ['新手友好', '技术线', '力量线', '平衡线', '耐力线'].slice(0, (i % 3) + 1);
            route.length = 10 + Math.floor(Math.random() * 20);
            route.open_date = new Date();
            const saved = await this.routeRepository.save(route);
            routes.push(saved);
        }
        return routes;
    }
    async createHolds(routes) {
        for (const route of routes) {
            const existingCount = await this.holdRepository.count({
                where: { route_id: route.id },
            });
            if (existingCount > 0)
                continue;
            const holdCount = 5 + Math.floor(Math.random() * 10);
            const holds = [];
            for (let i = 0; i < holdCount; i++) {
                const hold = new hold_entity_1.Hold();
                hold.route_id = route.id;
                hold.position_x = 10 + Math.random() * 80;
                hold.position_y = 10 + (i / holdCount) * 80 + Math.random() * 10;
                if (i === 0) {
                    hold.type = hold_entity_1.HoldType.START;
                }
                else if (i === holdCount - 1) {
                    hold.type = hold_entity_1.HoldType.END;
                }
                else {
                    hold.type = Math.random() > 0.7 ? hold_entity_1.HoldType.FOOT : hold_entity_1.HoldType.HAND;
                }
                holds.push(hold);
            }
            await this.holdRepository.save(holds);
        }
    }
    async createAscents(climbers, routes) {
        const ascentTypes = [ascent_entity_1.AscentType.FLASH, ascent_entity_1.AscentType.REDPOINT, ascent_entity_1.AscentType.ONSIGHT, ascent_entity_1.AscentType.HIGH_POINT, ascent_entity_1.AscentType.FALL];
        for (const climber of climbers) {
            const existingCount = await this.ascentRepository.count({
                where: { user_id: climber.id },
            });
            if (existingCount > 0)
                continue;
            const ascentCount = 3 + Math.floor(Math.random() * 8);
            const selectedRoutes = this.shuffleArray([...routes]).slice(0, ascentCount);
            for (let i = 0; i < selectedRoutes.length; i++) {
                const route = selectedRoutes[i];
                const ascent = new ascent_entity_1.Ascent();
                ascent.route_id = route.id;
                ascent.user_id = climber.id;
                ascent.ascent_type = ascentTypes[Math.floor(Math.random() * ascentTypes.length)];
                ascent.attempts = 1 + Math.floor(Math.random() * 5);
                ascent.felt_grade = route.grade;
                ascent.visibility = i % 2 === 0 ? ascent_entity_1.AscentVisibility.PUBLIC : ascent_entity_1.AscentVisibility.PRIVATE;
                if (i % 3 === 0) {
                    ascent.notes = '很棒的线路！';
                }
                await this.ascentRepository.save(ascent);
            }
        }
    }
    async createGradeVotes(climbers, routes) {
        const gradeVariations = ['+', '', '-'];
        for (const route of routes) {
            const existingCount = await this.gradeVoteRepository.count({
                where: { route_id: route.id },
            });
            if (existingCount > 0)
                continue;
            const voteCount = 2 + Math.floor(Math.random() * 4);
            const selectedClimbers = this.shuffleArray([...climbers]).slice(0, voteCount);
            for (const climber of selectedClimbers) {
                const vote = new grade_vote_entity_1.GradeVote();
                vote.route_id = route.id;
                vote.user_id = climber.id;
                const variation = gradeVariations[Math.floor(Math.random() * gradeVariations.length)];
                vote.suggested_grade = route.grade + variation;
                await this.gradeVoteRepository.save(vote);
            }
        }
    }
    shuffleArray(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
};
exports.SeedsService = SeedsService;
exports.SeedsService = SeedsService = SeedsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(gym_entity_1.Gym)),
    __param(2, (0, typeorm_1.InjectRepository)(wall_entity_1.Wall)),
    __param(3, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __param(4, (0, typeorm_1.InjectRepository)(hold_entity_1.Hold)),
    __param(5, (0, typeorm_1.InjectRepository)(ascent_entity_1.Ascent)),
    __param(6, (0, typeorm_1.InjectRepository)(grade_vote_entity_1.GradeVote)),
    __param(7, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedsService);
//# sourceMappingURL=seeds.service.js.map