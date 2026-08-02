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
exports.AscentController = void 0;
const common_1 = require("@nestjs/common");
const ascent_service_1 = require("./ascent.service");
const create_ascent_dto_1 = require("./dto/create-ascent.dto");
const update_ascent_dto_1 = require("./dto/update-ascent.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let AscentController = class AscentController {
    constructor(ascentService) {
        this.ascentService = ascentService;
    }
    isAdmin(role) {
        return role === user_entity_1.UserRole.GYM_ADMIN || role === user_entity_1.UserRole.PLATFORM_ADMIN;
    }
    findAll(route_id, user_id, start_date, end_date, req) {
        const parsedRouteId = route_id ? parseInt(route_id, 10) : undefined;
        const parsedUserId = user_id ? parseInt(user_id, 10) : undefined;
        const currentUserId = req.user.id;
        const currentUserRole = req.user.role;
        let effectiveUserId = parsedUserId;
        if (!this.isAdmin(currentUserRole)) {
            if (parsedUserId !== undefined && parsedUserId !== currentUserId) {
                throw new common_1.ForbiddenException('You can only view your own ascents');
            }
            if (parsedRouteId === undefined && parsedUserId === undefined) {
                effectiveUserId = currentUserId;
            }
        }
        return this.ascentService.findAll({
            route_id: parsedRouteId,
            user_id: effectiveUserId,
            start_date,
            end_date,
        });
    }
    async findOne(id, req) {
        const ascent = await this.ascentService.findOne(id);
        if (!ascent) {
            throw new common_1.NotFoundException(`Ascent with id ${id} not found`);
        }
        if (!this.isAdmin(req.user.role) && ascent.user_id !== req.user.id) {
            throw new common_1.ForbiddenException('You can only view your own ascents');
        }
        return this.ascentService.findOneFlattened(id);
    }
    create(createAscentDto, req) {
        return this.ascentService.create(req.user.id, createAscentDto);
    }
    update(id, updateAscentDto, req) {
        return this.ascentService.update(id, req.user.id, req.user.role, updateAscentDto);
    }
    remove(id, req) {
        return this.ascentService.remove(id, req.user.id, req.user.role);
    }
    getAscentCalendar(userId, month, req) {
        if (!this.isAdmin(req.user.role) && userId !== req.user.id) {
            throw new common_1.ForbiddenException('You can only view your own ascent calendar');
        }
        return this.ascentService.getAscentCalendar(userId, month);
    }
};
exports.AscentController = AscentController;
__decorate([
    (0, common_1.Get)('ascents'),
    __param(0, (0, common_1.Query)('route_id')),
    __param(1, (0, common_1.Query)('user_id')),
    __param(2, (0, common_1.Query)('start_date')),
    __param(3, (0, common_1.Query)('end_date')),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], AscentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('ascents/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AscentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('ascents'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.VERIFIED_CLIMBER, user_entity_1.UserRole.SETTER, user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ascent_dto_1.CreateAscentDto, Object]),
    __metadata("design:returntype", void 0)
], AscentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('ascents/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ascent_dto_1.UpdateAscentDto, Object]),
    __metadata("design:returntype", void 0)
], AscentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('ascents/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AscentController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('users/:userId/ascent-calendar'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], AscentController.prototype, "getAscentCalendar", null);
exports.AscentController = AscentController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [ascent_service_1.AscentService])
], AscentController);
//# sourceMappingURL=ascent.controller.js.map