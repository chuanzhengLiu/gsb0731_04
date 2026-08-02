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
exports.WallController = void 0;
const common_1 = require("@nestjs/common");
const wall_service_1 = require("./wall.service");
const create_wall_dto_1 = require("./dto/create-wall.dto");
const update_wall_dto_1 = require("./dto/update-wall.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let WallController = class WallController {
    constructor(wallService) {
        this.wallService = wallService;
    }
    findAllByGym(gymId) {
        return this.wallService.findAllByGym(gymId);
    }
    findOne(id) {
        return this.wallService.findOne(id);
    }
    create(gymId, createWallDto) {
        return this.wallService.create(gymId, createWallDto);
    }
    update(id, updateWallDto) {
        return this.wallService.update(id, updateWallDto);
    }
    remove(id) {
        return this.wallService.remove(id);
    }
};
exports.WallController = WallController;
__decorate([
    (0, common_1.Get)('gyms/:gymId/walls'),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WallController.prototype, "findAllByGym", null);
__decorate([
    (0, common_1.Get)('walls/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WallController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('gyms/:gymId/walls'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_wall_dto_1.CreateWallDto]),
    __metadata("design:returntype", void 0)
], WallController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('walls/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_wall_dto_1.UpdateWallDto]),
    __metadata("design:returntype", void 0)
], WallController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('walls/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WallController.prototype, "remove", null);
exports.WallController = WallController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [wall_service_1.WallService])
], WallController);
//# sourceMappingURL=wall.controller.js.map