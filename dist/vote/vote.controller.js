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
exports.VoteController = void 0;
const common_1 = require("@nestjs/common");
const vote_service_1 = require("./vote.service");
const vote_dto_1 = require("./dto/vote.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_entity_1 = require("../entities/user.entity");
let VoteController = class VoteController {
    constructor(voteService) {
        this.voteService = voteService;
    }
    vote(routeId, voteDto, req) {
        return this.voteService.vote(routeId, req.user.id, voteDto);
    }
    getVotes(routeId) {
        return this.voteService.getVotes(routeId);
    }
    getCalibration(userId) {
        return this.voteService.getCalibration(userId);
    }
};
exports.VoteController = VoteController;
__decorate([
    (0, common_1.Post)('routes/:routeId/vote'),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.VERIFIED_CLIMBER, user_entity_1.UserRole.SETTER, user_entity_1.UserRole.GYM_ADMIN, user_entity_1.UserRole.PLATFORM_ADMIN),
    __param(0, (0, common_1.Param)('routeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vote_dto_1.VoteDto, Object]),
    __metadata("design:returntype", void 0)
], VoteController.prototype, "vote", null);
__decorate([
    (0, common_1.Get)('routes/:routeId/votes'),
    __param(0, (0, common_1.Param)('routeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VoteController.prototype, "getVotes", null);
__decorate([
    (0, common_1.Get)('users/:userId/calibration'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VoteController.prototype, "getCalibration", null);
exports.VoteController = VoteController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [vote_service_1.VoteService])
], VoteController);
//# sourceMappingURL=vote.controller.js.map