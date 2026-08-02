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
exports.UserProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserProfile = class UserProfile {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id', unique: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'climbing_since', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "climbing_since", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'preferred_style', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "preferred_style", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'ape_index', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "ape_index", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'target_grade', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "target_grade", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserProfile.prototype, "user", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)('user_profile'),
    (0, typeorm_1.Index)('idx_profile_user', ['user_id'])
], UserProfile);
//# sourceMappingURL=user-profile.entity.js.map