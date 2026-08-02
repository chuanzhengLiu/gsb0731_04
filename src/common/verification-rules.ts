// Single source of truth for the account-verification review rules. Keeping the
// role-promotion and rejection decisions here prevents a future edit from
// accidentally reintroducing the "verification clobbers an admin-assigned role"
// bug, and keeps the approve/reject state transition testable without a DB /
// Nest runtime. Dependency-free (type-only import).
import type { UserRole } from '../entities/user.entity';

// Minimal shape of the verification-relevant user fields, so this module has no
// runtime dependency on the User entity.
export interface VerifiableUser {
  role: UserRole | string;
  verified_at: Date | null;
  rejected_at: Date | null;
  rejection_reason: string | null;
}

// A verification approval should only PROMOTE users who are still at the default
// GUEST role. A user an admin already elevated (SETTER / GYM_ADMIN / ...) must
// keep their role — approval only stamps verified_at. Compared against the
// 'guest' literal (UserRole.GUEST) to avoid a runtime dependency on the entity.
export function shouldPromoteOnApproval(currentRole: UserRole | string): boolean {
  return currentRole === 'guest';
}

// Applies an approve/reject decision to a user in place. Approval stamps
// verified_at, promotes only GUESTs, and clears any prior rejection. Rejection
// stamps rejected_at + reason and leaves role/verified_at untouched. `now` is
// injectable to keep tests deterministic.
export function applyVerificationDecision(
  user: VerifiableUser,
  approved: boolean,
  reason: string | undefined,
  verifiedClimberRole: UserRole | string = 'verified_climber',
  now: Date = new Date(),
): VerifiableUser {
  if (approved) {
    user.verified_at = now;
    if (shouldPromoteOnApproval(user.role)) {
      user.role = verifiedClimberRole;
    }
    user.rejected_at = null;
    user.rejection_reason = null;
  } else {
    user.rejected_at = now;
    user.rejection_reason = reason ?? null;
  }
  return user;
}

// Whether a user should still appear in the admin's pending-verification queue.
// Mirrors the getPendingVerifications DB query: not yet verified, not rejected,
// and no longer a GUEST. Kept here so the query and the rule stay aligned.
export function isPendingVerification(user: VerifiableUser): boolean {
  return user.verified_at === null && user.rejected_at === null && user.role !== 'guest';
}
