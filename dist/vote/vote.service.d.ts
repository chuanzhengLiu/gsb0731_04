import { Repository } from 'typeorm';
import { GradeVote } from '../entities/grade-vote.entity';
import { Route } from '../entities/route.entity';
import { VoteDto } from './dto/vote.dto';
export declare class VoteService {
    private voteRepository;
    private routeRepository;
    constructor(voteRepository: Repository<GradeVote>, routeRepository: Repository<Route>);
    vote(routeId: number, userId: number, voteDto: VoteDto): Promise<GradeVote>;
    getVotes(routeId: number): Promise<{
        votes: GradeVote[];
        distribution: Record<string, number>;
        consensus_grade: string | null;
        is_controversial: boolean;
        total_votes: number;
    }>;
    getVoteDistribution(votes: GradeVote[]): Record<string, number>;
    getConsensusGrade(votes: GradeVote[]): string | null;
    isControversial(routeId: number, votes?: GradeVote[]): Promise<boolean>;
    getCalibration(userId: number): Promise<{
        total_votes: number;
        trend: 'tight' | 'loose' | 'accurate';
        avg_deviation: number;
    }>;
}
