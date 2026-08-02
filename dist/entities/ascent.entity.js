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
exports.Ascent = exports.AscentVisibility = exports.AscentType = void 0;
const typeorm_1 = require("typeorm");
const route_entity_1 = require("./route.entity");
const user_entity_1 = require("./user.entity");
var AscentType;
(function (AscentType) {
    AscentType["FLASH"] = "flash";
    AscentType["REDPOINT"] = "redpoint";
    AscentType["ONSIGHT"] = "onsight";
    AscentType["HIGH_POINT"] = "high_point";
    AscentType["FALL"] = "fall";
})(AscentType || (exports.AscentType = AscentType = {}));
var AscentVisibility;
(function (AscentVisibility) {
    AscentVisibility["PRIVATE"] = "private";
    AscentVisibility["FRIENDS"] = "friends";
    AscentVisibility["PUBLIC"] = "public";
})(AscentVisibility || (exports.AscentVisibility = AscentVisibility = {}));
let Ascent = class Ascent {
};
exports.Ascent = Ascent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ascent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'route_id' }),
    __metadata("design:type", Number)
], Ascent.prototype, "route_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id' }),
    __metadata("design:type", Number)
], Ascent.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AscentType,
        name: 'ascent_type',
    }),
    __metadata("design:type", String)
], Ascent.prototype, "ascent_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Ascent.prototype, "attempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'felt_grade', nullable: true }),
    __metadata("design:type", String)
], Ascent.prototype, "felt_grade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'video_url', nullable: true }),
    __metadata("design:type", String)
], Ascent.prototype, "video_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Ascent.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AscentVisibility,
        default: AscentVisibility.PRIVATE,
    }),
    __metadata("design:type", String)
], Ascent.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Ascent.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => route_entity_1.Route, (route) => route.ascents),
    (0, typeorm_1.JoinColumn)({ name: 'route_id' }),
    __metadata("design:type", route_entity_1.Route)
], Ascent.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.ascents),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Ascent.prototype, "user", void 0);
exports.Ascent = Ascent = __decorate([
    (0, typeorm_1.Entity)('ascent'),
    (0, typeorm_1.Index)('idx_ascent_route', ['route_id']),
    (0, typeorm_1.Index)('idx_ascent_user', ['user_id']),
    (0, typeorm_1.Index)('idx_ascent_date', ['created_at'])
], Ascent);
//# sourceMappingURL=ascent.entity.js.map