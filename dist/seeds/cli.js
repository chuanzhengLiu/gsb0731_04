"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv = require("dotenv");
dotenv.config();
const core_1 = require("@nestjs/core");
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
const operation_log_entity_1 = require("../entities/operation-log.entity");
let CliModule = class CliModule {
};
CliModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'climbing_db',
                entities: [
                    user_entity_1.User,
                    gym_entity_1.Gym,
                    wall_entity_1.Wall,
                    route_entity_1.Route,
                    hold_entity_1.Hold,
                    ascent_entity_1.Ascent,
                    grade_vote_entity_1.GradeVote,
                    user_profile_entity_1.UserProfile,
                    operation_log_entity_1.OperationLog,
                ],
                synchronize: true,
            }),
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
    })
], CliModule);
async function bootstrap() {
    const logger = new common_1.Logger('SeederCLI');
    try {
        const app = await core_1.NestFactory.createApplicationContext(CliModule);
        const seedsService = app.get(seeds_service_1.SeedsService);
        logger.log('开始执行种子数据...');
        await seedsService.run();
        logger.log('种子数据执行成功！');
        await app.close();
        process.exit(0);
    }
    catch (error) {
        logger.error('种子数据执行失败', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=cli.js.map