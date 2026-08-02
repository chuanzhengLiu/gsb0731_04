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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("./analytics.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getRouteHeat(gymId) {
        return this.analyticsService.getRouteHeat(gymId);
    }
    getColdRoutes(gymId) {
        return this.analyticsService.getColdRoutes(gymId);
    }
    getSetterWorkload(gymId, month) {
        return this.analyticsService.getSetterWorkload(gymId, month);
    }
    getActiveUsers(gymId) {
        return this.analyticsService.getActiveUsers(gymId);
    }
    getPyramid(req) {
        return this.analyticsService.getPyramid(req.user.id);
    }
    getProgress(req) {
        return this.analyticsService.getProgress(req.user.id);
    }
    getStyleAnalysis(req) {
        return this.analyticsService.getStyleAnalysis(req.user.id);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('gyms/:gymId/stats/route-heat'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getRouteHeat", null);
__decorate([
    (0, common_1.Get)('gyms/:gymId/stats/cold-routes'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getColdRoutes", null);
__decorate([
    (0, common_1.Get)('gyms/:gymId/stats/setter-work'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getSetterWorkload", null);
__decorate([
    (0, common_1.Get)('gyms/:gymId/stats/active-users'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getActiveUsers", null);
__decorate([
    (0, common_1.Get)('analytics/pyramid'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getPyramid", null);
__decorate([
    (0, common_1.Get)('analytics/progress'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Get)('analytics/style'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getStyleAnalysis", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map