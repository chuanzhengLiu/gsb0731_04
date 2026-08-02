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
var SeedsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seeds_service_1 = require("./seeds.service");
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const wall_entity_1 = require("../entities/wall.entity");
const route_entity_1 = require("../entities/route.entity");
const hold_entity_1 = require("../entities/hold.entity");
const ascent_entity_1 = require("../entities/ascent.entity");
const grade_vote_entity_1 = require("../entities/grade-vote.entity");
const user_profile_entity_1 = require("../entities/user-profile.entity");
let SeedsModule = SeedsModule_1 = class SeedsModule {
    constructor(seedsService) {
        this.seedsService = seedsService;
        this.logger = new common_1.Logger(SeedsModule_1.name);
    }
    async onModuleInit() {
        try {
            this.logger.log('Checking and running seed data...');
            await this.seedsService.run();
            this.logger.log('Seed data initialization complete.');
        }
        catch (error) {
            this.logger.error('Failed to run seed data', error);
        }
    }
};
exports.SeedsModule = SeedsModule;
exports.SeedsModule = SeedsModule = SeedsModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                gym_entity_1.Gym,
                wall_entity_1.Wall,
                route_entity_1.Route,
                hold_entity_1.Hold,
                ascent_entity_1.Ascent,
                grade_vote_entity_1.GradeVote,
                user_profile_entity_1.UserProfile,
            ]),
        ],
        providers: [seeds_service_1.SeedsService],
        exports: [seeds_service_1.SeedsService],
    }),
    __metadata("design:paramtypes", [seeds_service_1.SeedsService])
], SeedsModule);
//# sourceMappingURL=seeds.module.js.map