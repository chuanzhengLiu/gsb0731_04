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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const verify_user_dto_1 = require("./dto/verify-user.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findByGym(gymId, role, verified, rejected, search) {
        return this.userService.findByGym(gymId, {
            role,
            verified: verified !== undefined ? verified === 'true' : undefined,
            rejected: rejected !== undefined ? rejected === 'true' : undefined,
            search,
        });
    }
    getPendingVerifications(gymId) {
        return this.userService.getPendingVerifications(gymId);
    }
    verifyUser(id, verifyUserDto) {
        return this.userService.verifyUser(id, verifyUserDto.approved, verifyUserDto.reason);
    }
    updateRole(id, updateRoleDto) {
        return this.userService.updateRole(id, updateRoleDto.role);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('gyms/:gymId/users'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('role')),
    __param(2, (0, common_1.Query)('verified')),
    __param(3, (0, common_1.Query)('rejected')),
    __param(4, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findByGym", null);
__decorate([
    (0, common_1.Get)('gyms/:gymId/pending-verifications'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('gymId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPendingVerifications", null);
__decorate([
    (0, common_1.Patch)('users/:id/verify'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, verify_user_dto_1.VerifyUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Patch)('users/:id/role'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateRole", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map