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
exports.RouteController = void 0;
const common_1 = require("@nestjs/common");
const route_service_1 = require("./route.service");
const create_route_dto_1 = require("./dto/create-route.dto");
const update_route_dto_1 = require("./dto/update-route.dto");
const update_route_status_dto_1 = require("./dto/update-route-status.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
const route_entity_1 = require("../entities/route.entity");
let RouteController = class RouteController {
    constructor(routeService) {
        this.routeService = routeService;
    }
    findAllByWall(wallId, type, grade, status) {
        return this.routeService.findAllByWall(wallId, { type, grade, status });
    }
    findOne(id) {
        return this.routeService.findOne(id);
    }
    create(wallId, createRouteDto) {
        return this.routeService.create(wallId, createRouteDto);
    }
    update(id, updateRouteDto) {
        return this.routeService.update(id, updateRouteDto);
    }
    remove(id) {
        return this.routeService.remove(id);
    }
    updateStatus(id, updateRouteStatusDto) {
        return this.routeService.updateStatus(id, updateRouteStatusDto.status);
    }
};
exports.RouteController = RouteController;
__decorate([
    (0, common_1.Get)('walls/:wallId/routes'),
    __param(0, (0, common_1.Param)('wallId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('grade')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "findAllByWall", null);
__decorate([
    (0, common_1.Get)('routes/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('walls/:wallId/routes'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('wallId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_route_dto_1.CreateRouteDto]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('routes/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_route_dto_1.UpdateRouteDto]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('routes/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('routes/:id/status'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_route_status_dto_1.UpdateRouteStatusDto]),
    __metadata("design:returntype", void 0)
], RouteController.prototype, "updateStatus", null);
exports.RouteController = RouteController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [route_service_1.RouteService])
], RouteController);
//# sourceMappingURL=route.controller.js.map