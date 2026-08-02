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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grade_vote_entity_1 = require("../entities/grade-vote.entity");
const route_entity_1 = require("../entities/route.entity");
const GRADE_ORDER = [
    'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10',
    'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17',
    '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d',
    '5.11a', '5.11b', '5.11c', '5.11d',
    '5.12a', '5.12b', '5.12c', '5.12d',
    '5.13a', '5.13b', '5.13c', '5.13d',
    '5.14a', '5.14b', '5.14c', '5.14d',
    '5.15a', '5.15b', '5.15c', '5.15d',
];
function getGradeIndex(grade) {
    const index = GRADE_ORDER.indexOf(grade);
    return index === -1 ? -1 : index;
}
function compareGrades(gradeA, gradeB) {
    const indexA = getGradeIndex(gradeA);
    const indexB = getGradeIndex(gradeB);
    if (indexA === -1 || indexB === -1)
        return 0;
    return indexA - indexB;
}
let VoteService = class VoteService {
    constructor(voteRepository, routeRepository) {
        this.voteRepository = voteRepository;
        this.routeRepository = routeRepository;
    }
    async vote(routeId, userId, voteDto) {
        const route = await this.routeRepository.findOne({ where: { id: routeId } });
        if (!route) {
            throw new common_1.BadRequestException('Route not found');
        }
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        const existingVote = await this.voteRepository.findOne({
            where: {
                route_id: routeId,
                user_id: userId,
                created_at: (0, typeorm_2.MoreThan)(twentyFourHoursAgo),
            },
        });
        if (existingVote) {
            throw new common_1.BadRequestException('You can only vote once per route every 24 hours');
        }
        const vote = this.voteRepository.create({
            route_id: routeId,
            user_id: userId,
            suggested_grade: voteDto.suggested_grade,
        });
        return this.voteRepository.save(vote);
    }
    async getVotes(routeId) {
        const votes = await this.voteRepository.find({
            where: { route_id: routeId },
            order: { created_at: 'DESC' },
        });
        const distribution = this.getVoteDistribution(votes);
        const consensusGrade = this.getConsensusGrade(votes);
        const isControversial = await this.isControversial(routeId, votes);
        return {
            votes,
            distribution,
            consensus_grade: consensusGrade,
            is_controversial: isControversial,
            total_votes: votes.length,
        };
    }
    getVoteDistribution(votes) {
        const distribution = {};
        for (const vote of votes) {
            distribution[vote.suggested_grade] = (distribution[vote.suggested_grade] || 0) + 1;
        }
        return distribution;
    }
    getConsensusGrade(votes) {
        if (votes.length < 10) {
            return null;
        }
        const sortedGrades = [...votes]
            .sort((a, b) => compareGrades(a.suggested_grade, b.suggested_grade))
            .map((v) => v.suggested_grade);
        const mid = Math.floor(sortedGrades.length / 2);
        if (sortedGrades.length % 2 === 0) {
            return sortedGrades[mid - 1];
        }
        return sortedGrades[mid];
    }
    async isControversial(routeId, votes) {
        const route = await this.routeRepository.findOne({ where: { id: routeId } });
        if (!route) {
            return false;
        }
        const voteList = votes || (await this.voteRepository.find({ where: { route_id: routeId } }));
        const consensusGrade = this.getConsensusGrade(voteList);
        if (!consensusGrade) {
            return false;
        }
        const diff = Math.abs(compareGrades(route.grade, consensusGrade));
        return diff > 1;
    }
    async getCalibration(userId) {
        const votes = await this.voteRepository.find({
            where: { user_id: userId },
            relations: ['route'],
        });
        if (votes.length === 0) {
            return {
                total_votes: 0,
                trend: 'accurate',
                avg_deviation: 0,
            };
        }
        let totalDeviation = 0;
        let validVotes = 0;
        for (const vote of votes) {
            if (vote.route) {
                const deviation = compareGrades(vote.suggested_grade, vote.route.grade);
                totalDeviation += deviation;
                validVotes += 1;
            }
        }
        if (validVotes === 0) {
            return {
                total_votes: votes.length,
                trend: 'accurate',
                avg_deviation: 0,
            };
        }
        const averageDeviation = totalDeviation / validVotes;
        let trend = 'accurate';
        if (averageDeviation > 0.2) {
            trend = 'tight';
        }
        else if (averageDeviation < -0.2) {
            trend = 'loose';
        }
        return {
            total_votes: votes.length,
            trend,
            avg_deviation: Number(averageDeviation.toFixed(2)),
        };
    }
};
exports.VoteService = VoteService;
exports.VoteService = VoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grade_vote_entity_1.GradeVote)),
    __param(1, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VoteService);
//# sourceMappingURL=vote.service.js.map