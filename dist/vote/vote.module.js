"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const grade_vote_entity_1 = require("../entities/grade-vote.entity");
const route_entity_1 = require("../entities/route.entity");
const vote_service_1 = require("./vote.service");
const vote_controller_1 = require("./vote.controller");
let VoteModule = class VoteModule {
};
exports.VoteModule = VoteModule;
exports.VoteModule = VoteModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([grade_vote_entity_1.GradeVote, route_entity_1.Route])],
        controllers: [vote_controller_1.VoteController],
        providers: [vote_service_1.VoteService],
        exports: [vote_service_1.VoteService],
    })
], VoteModule);
//# sourceMappingURL=vote.module.js.map