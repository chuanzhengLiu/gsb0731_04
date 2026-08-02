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
exports.Gym = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const wall_entity_1 = require("./wall.entity");
let Gym = class Gym {
};
exports.Gym = Gym;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Gym.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Gym.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Gym.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Gym.prototype, "area_sqm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'admin_id' }),
    __metadata("design:type", Number)
], Gym.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Gym.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Gym.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'admin_id' }),
    __metadata("design:type", user_entity_1.User)
], Gym.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wall_entity_1.Wall, (wall) => wall.gym),
    __metadata("design:type", Array)
], Gym.prototype, "walls", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.gym),
    __metadata("design:type", Array)
], Gym.prototype, "users", void 0);
exports.Gym = Gym = __decorate([
    (0, typeorm_1.Entity)('gym'),
    (0, typeorm_1.Index)('idx_gym_admin', ['admin_id'])
], Gym);
//# sourceMappingURL=gym.entity.js.map