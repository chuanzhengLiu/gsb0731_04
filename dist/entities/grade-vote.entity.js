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
exports.GradeVote = void 0;
const typeorm_1 = require("typeorm");
const route_entity_1 = require("./route.entity");
const user_entity_1 = require("./user.entity");
let GradeVote = class GradeVote {
};
exports.GradeVote = GradeVote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GradeVote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'route_id' }),
    __metadata("design:type", Number)
], GradeVote.prototype, "route_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id' }),
    __metadata("design:type", Number)
], GradeVote.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'suggested_grade' }),
    __metadata("design:type", String)
], GradeVote.prototype, "suggested_grade", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], GradeVote.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => route_entity_1.Route, (route) => route.gradeVotes),
    (0, typeorm_1.JoinColumn)({ name: 'route_id' }),
    __metadata("design:type", route_entity_1.Route)
], GradeVote.prototype, "route", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.gradeVotes),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], GradeVote.prototype, "user", void 0);
exports.GradeVote = GradeVote = __decorate([
    (0, typeorm_1.Entity)('grade_vote'),
    (0, typeorm_1.Index)('idx_vote_route', ['route_id'])
], GradeVote);
//# sourceMappingURL=grade-vote.entity.js.map