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
exports.Route = exports.RouteStatus = exports.RouteType = void 0;
const typeorm_1 = require("typeorm");
const wall_entity_1 = require("./wall.entity");
const user_entity_1 = require("./user.entity");
const hold_entity_1 = require("./hold.entity");
const ascent_entity_1 = require("./ascent.entity");
const grade_vote_entity_1 = require("./grade-vote.entity");
var RouteType;
(function (RouteType) {
    RouteType["LEAD"] = "lead";
    RouteType["TOP_ROPE"] = "top_rope";
    RouteType["BOULDER"] = "boulder";
    RouteType["SPEED"] = "speed";
})(RouteType || (exports.RouteType = RouteType = {}));
var RouteStatus;
(function (RouteStatus) {
    RouteStatus["DRAFTING"] = "drafting";
    RouteStatus["OPEN"] = "open";
    RouteStatus["REMOVING"] = "removing";
    RouteStatus["REMOVED"] = "removed";
})(RouteStatus || (exports.RouteStatus = RouteStatus = {}));
let Route = class Route {
};
exports.Route = Route;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Route.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'wall_id' }),
    __metadata("design:type", Number)
], Route.prototype, "wall_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Route.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RouteType,
    }),
    __metadata("design:type", String)
], Route.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'path_coords', nullable: true }),
    __metadata("design:type", Object)
], Route.prototype, "path_coords", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Route.prototype, "grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Route.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'setter_id', nullable: true }),
    __metadata("design:type", Number)
], Route.prototype, "setter_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RouteStatus,
        default: RouteStatus.DRAFTING,
    }),
    __metadata("design:type", String)
], Route.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Route.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Route.prototype, "length", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'open_date', nullable: true }),
    __metadata("design:type", Date)
], Route.prototype, "open_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'planned_remove_date', nullable: true }),
    __metadata("design:type", Date)
], Route.prototype, "planned_remove_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Route.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Route.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => wall_entity_1.Wall, (wall) => wall.routes),
    (0, typeorm_1.JoinColumn)({ name: 'wall_id' }),
    __metadata("design:type", wall_entity_1.Wall)
], Route.prototype, "wall", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.routes),
    (0, typeorm_1.JoinColumn)({ name: 'setter_id' }),
    __metadata("design:type", user_entity_1.User)
], Route.prototype, "setter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hold_entity_1.Hold, (hold) => hold.route),
    __metadata("design:type", Array)
], Route.prototype, "holds", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ascent_entity_1.Ascent, (ascent) => ascent.route),
    __metadata("design:type", Array)
], Route.prototype, "ascents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => grade_vote_entity_1.GradeVote, (vote) => vote.route),
    __metadata("design:type", Array)
], Route.prototype, "gradeVotes", void 0);
exports.Route = Route = __decorate([
    (0, typeorm_1.Entity)('route'),
    (0, typeorm_1.Index)('idx_route_wall', ['wall_id']),
    (0, typeorm_1.Index)('idx_route_status', ['status']),
    (0, typeorm_1.Index)('idx_route_setter', ['setter_id'])
], Route);
//# sourceMappingURL=route.entity.js.map