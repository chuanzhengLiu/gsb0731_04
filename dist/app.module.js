"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const serve_static_1 = require("@nestjs/serve-static");
const passport_1 = require("@nestjs/passport");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const gym_module_1 = require("./gym/gym.module");
const wall_module_1 = require("./wall/wall.module");
const route_module_1 = require("./route/route.module");
const hold_module_1 = require("./hold/hold.module");
const ascent_module_1 = require("./ascent/ascent.module");
const vote_module_1 = require("./vote/vote.module");
const analytics_module_1 = require("./analytics/analytics.module");
const user_module_1 = require("./user/user.module");
const upload_module_1 = require("./upload/upload.module");
const seeds_module_1 = require("./seeds/seeds.module");
const user_entity_1 = require("./entities/user.entity");
const gym_entity_1 = require("./entities/gym.entity");
const wall_entity_1 = require("./entities/wall.entity");
const route_entity_1 = require("./entities/route.entity");
const hold_entity_1 = require("./entities/hold.entity");
const ascent_entity_1 = require("./entities/ascent.entity");
const grade_vote_entity_1 = require("./entities/grade-vote.entity");
const user_profile_entity_1 = require("./entities/user-profile.entity");
const operation_log_entity_1 = require("./entities/operation-log.entity");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || '',
                database: process.env.DB_DATABASE || 'climbing',
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
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/static',
                serveStaticOptions: {
                    index: false,
                },
            }),
            auth_module_1.AuthModule,
            gym_module_1.GymModule,
            wall_module_1.WallModule,
            route_module_1.RouteModule,
            hold_module_1.HoldModule,
            ascent_module_1.AscentModule,
            vote_module_1.VoteModule,
            analytics_module_1.AnalyticsModule,
            user_module_1.UserModule,
            upload_module_1.UploadModule,
            seeds_module_1.SeedsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map