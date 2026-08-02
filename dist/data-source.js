"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const gym_entity_1 = require("./entities/gym.entity");
const wall_entity_1 = require("./entities/wall.entity");
const route_entity_1 = require("./entities/route.entity");
const hold_entity_1 = require("./entities/hold.entity");
const ascent_entity_1 = require("./entities/ascent.entity");
const grade_vote_entity_1 = require("./entities/grade-vote.entity");
const user_profile_entity_1 = require("./entities/user-profile.entity");
const operation_log_entity_1 = require("./entities/operation-log.entity");
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'climberoot',
    database: 'climbing_db',
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
    migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map