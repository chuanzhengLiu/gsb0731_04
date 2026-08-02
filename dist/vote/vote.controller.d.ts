import { VoteService } from './vote.service';
import { VoteDto } from './dto/vote.dto';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    vote(routeId: number, voteDto: VoteDto, req: any): Promise<import("../entities/grade-vote.entity").GradeVote>;
    getVotes(routeId: number): Promise<{
        votes: import("../entities/grade-vote.entity").GradeVote[];
        distribution: Record<string, number>;
        consensus_grade: string | null;
        is_controversial: boolean;
        total_votes: number;
    }>;
    getCalibration(userId: number): Promise<{
        total_votes: number;
        trend: "tight" | "loose" | "accurate";
        avg_deviation: number;
    }>;
}
