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
exports.Wall = void 0;
const typeorm_1 = require("typeorm");
const gym_entity_1 = require("./gym.entity");
const route_entity_1 = require("./route.entity");
let Wall = class Wall {
};
exports.Wall = Wall;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Wall.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'gym_id' }),
    __metadata("design:type", Number)
], Wall.prototype, "gym_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Wall.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'photo_url', nullable: true }),
    __metadata("design:type", String)
], Wall.prototype, "photo_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'polygon_coords', nullable: true }),
    __metadata("design:type", Object)
], Wall.prototype, "polygon_coords", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Wall.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Wall.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.walls),
    (0, typeorm_1.JoinColumn)({ name: 'gym_id' }),
    __metadata("design:type", gym_entity_1.Gym)
], Wall.prototype, "gym", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => route_entity_1.Route, (route) => route.wall),
    __metadata("design:type", Array)
], Wall.prototype, "routes", void 0);
exports.Wall = Wall = __decorate([
    (0, typeorm_1.Entity)('wall'),
    (0, typeorm_1.Index)('idx_wall_gym', ['gym_id'])
], Wall);
//# sourceMappingURL=wall.entity.js.map