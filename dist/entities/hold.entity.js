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
exports.Hold = exports.HoldType = void 0;
const typeorm_1 = require("typeorm");
const route_entity_1 = require("./route.entity");
var HoldType;
(function (HoldType) {
    HoldType["HAND"] = "hand";
    HoldType["FOOT"] = "foot";
    HoldType["START"] = "start";
    HoldType["END"] = "end";
})(HoldType || (exports.HoldType = HoldType = {}));
let Hold = class Hold {
};
exports.Hold = Hold;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Hold.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'route_id' }),
    __metadata("design:type", Number)
], Hold.prototype, "route_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'position_x' }),
    __metadata("design:type", Number)
], Hold.prototype, "position_x", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'position_y' }),
    __metadata("design:type", Number)
], Hold.prototype, "position_y", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: HoldType,
    }),
    __metadata("design:type", String)
], Hold.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => route_entity_1.Route, (route) => route.holds),
    (0, typeorm_1.JoinColumn)({ name: 'route_id' }),
    __metadata("design:type", route_entity_1.Route)
], Hold.prototype, "route", void 0);
exports.Hold = Hold = __decorate([
    (0, typeorm_1.Entity)('hold'),
    (0, typeorm_1.Index)('idx_hold_route', ['route_id'])
], Hold);
//# sourceMappingURL=hold.entity.js.map