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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("./gym.entity");
const ascent_entity_1 = require("./ascent.entity");
const grade_vote_entity_1 = require("./grade-vote.entity");
const route_entity_1 = require("./route.entity");
const user_profile_entity_1 = require("./user-profile.entity");
const operation_log_entity_1 = require("./operation-log.entity");
var UserRole;
(function (UserRole) {
    UserRole["PLATFORM_ADMIN"] = "platform_admin";
    UserRole["GYM_ADMIN"] = "gym_admin";
    UserRole["SETTER"] = "setter";
    UserRole["VERIFIED_CLIMBER"] = "verified_climber";
    UserRole["GUEST"] = "guest";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, name: 'password_hash' }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GUEST,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gym_id', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "gym_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'verified_at', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "verified_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'rejected_at', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "rejected_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'rejection_reason', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "rejection_reason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.users),
    (0, typeorm_1.JoinColumn)({ name: 'gym_id' }),
    __metadata("design:type", gym_entity_1.Gym)
], User.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ascent_entity_1.Ascent, (ascent) => ascent.user),
    __metadata("design:type", Array)
], User.prototype, "ascents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => grade_vote_entity_1.GradeVote, (vote) => vote.user),
    __metadata("design:type", Array)
], User.prototype, "gradeVotes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => route_entity_1.Route, (route) => route.setter),
    __metadata("design:type", Array)
], User.prototype, "routes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfile, (profile) => profile.user),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operation_log_entity_1.OperationLog, (log) => log.user),
    __metadata("design:type", Array)
], User.prototype, "operationLogs", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user'),
    (0, typeorm_1.Index)('idx_user_gym', ['gym_id']),
    (0, typeorm_1.Index)('idx_user_role', ['role'])
], User);
//# sourceMappingURL=user.entity.js.map