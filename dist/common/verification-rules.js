"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldPromoteOnApproval = shouldPromoteOnApproval;
exports.applyVerificationDecision = applyVerificationDecision;
exports.isPendingVerification = isPendingVerification;
function shouldPromoteOnApproval(currentRole) {
    return currentRole === 'guest';
}
function applyVerificationDecision(user, approved, reason, verifiedClimberRole = 'verified_climber', now = new Date()) {
    if (approved) {
        user.verified_at = now;
        if (shouldPromoteOnApproval(user.role)) {
            user.role = verifiedClimberRole;
        }
        user.rejected_at = null;
        user.rejection_reason = null;
    }
    else {
        user.rejected_at = now;
        user.rejection_reason = reason ?? null;
    }
    return user;
}
function isPendingVerification(user) {
    return user.verified_at === null && user.rejected_at === null && user.role !== 'guest';
}
//# sourceMappingURL=verification-rules.js.map