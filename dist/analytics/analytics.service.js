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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const route_entity_1 = require("../entities/route.entity");
const ascent_entity_1 = require("../entities/ascent.entity");
const user_entity_1 = require("../entities/user.entity");
const wall_entity_1 = require("../entities/wall.entity");
let AnalyticsService = class AnalyticsService {
    constructor(routeRepository, ascentRepository, userRepository, wallRepository) {
        this.routeRepository = routeRepository;
        this.ascentRepository = ascentRepository;
        this.userRepository = userRepository;
        this.wallRepository = wallRepository;
    }
    async getRouteHeat(gymId) {
        const walls = await this.wallRepository.find({
            where: { gym_id: gymId },
            select: ['id'],
        });
        const wallIds = walls.map((w) => w.id);
        if (wallIds.length === 0) {
            return [];
        }
        const routes = await this.routeRepository.find({
            where: { wall_id: (0, typeorm_2.In)(wallIds), status: route_entity_1.RouteStatus.OPEN },
            select: ['id', 'name', 'grade'],
        });
        const result = [];
        const sentTypes = [ascent_entity_1.AscentType.FLASH, ascent_entity_1.AscentType.ONSIGHT, ascent_entity_1.AscentType.REDPOINT];
        for (const route of routes) {
            const allAscents = await this.ascentRepository.count({
                where: { route_id: route.id },
            });
            const sentAscents = await this.ascentRepository
                .createQueryBuilder('ascent')
                .where('ascent.route_id = :routeId', { routeId: route.id })
                .andWhere('ascent.ascent_type IN (:...types)', { types: sentTypes })
                .getCount();
            result.push({
                route_id: route.id,
                route_name: route.name,
                grade: route.grade,
                total_ascents: allAscents,
                sent_count: sentAscents,
                send_rate: allAscents > 0 ? Number(((sentAscents / allAscents) * 100).toFixed(2)) : 0,
            });
        }
        return result.sort((a, b) => b.total_ascents - a.total_ascents);
    }
    async getColdRoutes(gymId) {
        const walls = await this.wallRepository.find({
            where: { gym_id: gymId },
            select: ['id'],
        });
        const wallIds = walls.map((w) => w.id);
        if (wallIds.length === 0) {
            return [];
        }
        const routes = await this.routeRepository.find({
            where: { wall_id: (0, typeorm_2.In)(wallIds), status: route_entity_1.RouteStatus.OPEN },
            select: ['id', 'name', 'grade', 'open_date'],
        });
        const result = [];
        for (const route of routes) {
            const lastAscent = await this.ascentRepository.findOne({
                where: { route_id: route.id },
                order: { created_at: 'DESC' },
                select: ['created_at'],
            });
            let daysSinceLastAscent;
            if (lastAscent) {
                const diffTime = Date.now() - lastAscent.created_at.getTime();
                daysSinceLastAscent = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }
            else if (route.open_date) {
                const diffTime = Date.now() - new Date(route.open_date).getTime();
                daysSinceLastAscent = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }
            else {
                daysSinceLastAscent = 999;
            }
            if (daysSinceLastAscent >= 7) {
                result.push({
                    route_id: route.id,
                    route_name: route.name,
                    grade: route.grade,
                    days_since_last_ascent: daysSinceLastAscent,
                    open_date: route.open_date,
                });
            }
        }
        return result.sort((a, b) => b.days_since_last_ascent - a.days_since_last_ascent);
    }
    async getSetterWorkload(gymId, month) {
        const [year, monthNum] = month.split('-').map(Number);
        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);
        endDate.setHours(23, 59, 59, 999);
        const walls = await this.wallRepository.find({
            where: { gym_id: gymId },
            select: ['id'],
        });
        const wallIds = walls.map((w) => w.id);
        if (wallIds.length === 0) {
            return [];
        }
        const setters = await this.userRepository.find({
            where: { gym_id: gymId, role: user_entity_1.UserRole.SETTER },
            select: ['id', 'name'],
        });
        const result = [];
        for (const setter of setters) {
            const routesCount = await this.routeRepository.count({
                where: {
                    wall_id: (0, typeorm_2.In)(wallIds),
                    setter_id: setter.id,
                    created_at: (0, typeorm_2.Between)(startDate, endDate),
                },
            });
            result.push({
                setter_id: setter.id,
                setter_name: setter.name,
                routes_set: routesCount,
            });
        }
        return result.sort((a, b) => b.routes_set - a.routes_set);
    }
    async getActiveUsers(gymId) {
        const totalMembers = await this.userRepository.count({
            where: { gym_id: gymId },
        });
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const walls = await this.wallRepository.find({
            where: { gym_id: gymId },
            select: ['id'],
        });
        const wallIds = walls.map((w) => w.id);
        let weeklyActiveUsers = 0;
        let totalRoutesClimbed = 0;
        if (wallIds.length > 0) {
            const routes = await this.routeRepository.find({
                where: { wall_id: (0, typeorm_2.In)(wallIds) },
                select: ['id'],
            });
            const routeIds = routes.map((r) => r.id);
            if (routeIds.length > 0) {
                const recentAscents = await this.ascentRepository.find({
                    where: {
                        route_id: (0, typeorm_2.In)(routeIds),
                        created_at: (0, typeorm_2.MoreThan)(sevenDaysAgo),
                    },
                    select: ['user_id', 'route_id'],
                });
                const uniqueUsers = new Set();
                const userRouteMap = new Map();
                for (const ascent of recentAscents) {
                    uniqueUsers.add(ascent.user_id);
                    if (!userRouteMap.has(ascent.user_id)) {
                        userRouteMap.set(ascent.user_id, new Set());
                    }
                    userRouteMap.get(ascent.user_id).add(ascent.route_id);
                }
                weeklyActiveUsers = uniqueUsers.size;
                let totalRoutes = 0;
                for (const routeSet of userRouteMap.values()) {
                    totalRoutes += routeSet.size;
                }
                totalRoutesClimbed = totalRoutes;
            }
        }
        const avgRoutesPerUser = weeklyActiveUsers > 0
            ? Number((totalRoutesClimbed / weeklyActiveUsers).toFixed(2))
            : 0;
        return {
            weekly_active_users: weeklyActiveUsers,
            total_members: totalMembers,
            avg_routes_per_user: avgRoutesPerUser,
        };
    }
    async getPyramid(userId) {
        const ascents = await this.ascentRepository.find({
            where: { user_id: userId },
            relations: ['route'],
        });
        const pyramid = {};
        const sentTypes = [ascent_entity_1.AscentType.FLASH, ascent_entity_1.AscentType.ONSIGHT, ascent_entity_1.AscentType.REDPOINT];
        for (const ascent of ascents) {
            if (sentTypes.includes(ascent.ascent_type) && ascent.route) {
                pyramid[ascent.route.grade] = (pyramid[ascent.route.grade] || 0) + 1;
            }
        }
        return pyramid;
    }
    async getProgress(userId) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const ascents = await this.ascentRepository.find({
            where: {
                user_id: userId,
                created_at: (0, typeorm_2.MoreThan)(thirtyDaysAgo),
            },
            order: { created_at: 'ASC' },
        });
        const dailyCount = {};
        for (const ascent of ascents) {
            const d = ascent.created_at;
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            dailyCount[dateStr] = (dailyCount[dateStr] || 0) + 1;
        }
        const result = Object.entries(dailyCount).map(([date, count]) => ({
            date,
            count,
        }));
        return result;
    }
    async getStyleAnalysis(userId) {
        const ascents = await this.ascentRepository.find({
            where: { user_id: userId },
        });
        const styleCount = {};
        for (const ascent of ascents) {
            styleCount[ascent.ascent_type] = (styleCount[ascent.ascent_type] || 0) + 1;
        }
        return styleCount;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __param(1, (0, typeorm_1.InjectRepository)(ascent_entity_1.Ascent)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(wall_entity_1.Wall)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map