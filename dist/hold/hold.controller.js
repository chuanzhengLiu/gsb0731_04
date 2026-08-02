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
exports.HoldController = void 0;
const common_1 = require("@nestjs/common");
const hold_service_1 = require("./hold.service");
const update_hold_dto_1 = require("./dto/update-hold.dto");
const batch_create_hold_dto_1 = require("./dto/batch-create-hold.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let HoldController = class HoldController {
    constructor(holdService) {
        this.holdService = holdService;
    }
    findAllByRoute(routeId) {
        return this.holdService.findAllByRoute(routeId);
    }
    batchCreate(routeId, batchCreateHoldDto) {
        return this.holdService.batchCreate(routeId, batchCreateHoldDto.holds);
    }
    update(id, updateHoldDto) {
        return this.holdService.update(id, updateHoldDto);
    }
    remove(id) {
        return this.holdService.remove(id);
    }
};
exports.HoldController = HoldController;
__decorate([
    (0, common_1.Get)('routes/:routeId/holds'),
    __param(0, (0, common_1.Param)('routeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HoldController.prototype, "findAllByRoute", null);
__decorate([
    (0, common_1.Post)('routes/:routeId/holds'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('routeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, batch_create_hold_dto_1.BatchCreateHoldDto]),
    __metadata("design:returntype", void 0)
], HoldController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)('holds/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_hold_dto_1.UpdateHoldDto]),
    __metadata("design:returntype", void 0)
], HoldController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('holds/:id'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.SETTER),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HoldController.prototype, "remove", null);
exports.HoldController = HoldController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [hold_service_1.HoldService])
], HoldController);
//# sourceMappingURL=hold.controller.js.map