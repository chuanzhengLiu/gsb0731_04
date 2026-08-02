import type { UserRole } from '../entities/user.entity';
export interface VerifiableUser {
    role: UserRole | string;
    verified_at: Date | null;
    rejected_at: Date | null;
    rejection_reason: string | null;
}
export declare function shouldPromoteOnApproval(currentRole: UserRole | string): boolean;
export declare function applyVerificationDecision(user: VerifiableUser, approved: boolean, reason: string | undefined, verifiedClimberRole?: UserRole | string, now?: Date): VerifiableUser;
export declare function isPendingVerification(user: VerifiableUser): boolean;
