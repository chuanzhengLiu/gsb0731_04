import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldPromoteOnApproval,
  applyVerificationDecision,
  isPendingVerification,
} from './verification-rules.ts';
import type { VerifiableUser } from './verification-rules.ts';

// These tests lock down the account-verification review rules. If someone edits
// the approve/reject logic so that approval unconditionally overwrites the role,
// or rejection stops recording a reason / stops removing users from the pending
// queue, these tests fail. Run with: npm test

function makeUser(overrides: Partial<VerifiableUser> = {}): VerifiableUser {
  return {
    role: 'guest',
    verified_at: null,
    rejected_at: null,
    rejection_reason: null,
    ...overrides,
  };
}

describe('认证通过时的角色提升 (shouldPromoteOnApproval)', () => {
  test('访客(guest)认证通过 -> 应提升为认证用户', () => {
    assert.equal(shouldPromoteOnApproval('guest'), true);
  });

  test('定线员(setter)认证通过 -> 不能被降级 (回归测试)', () => {
    assert.equal(shouldPromoteOnApproval('setter'), false);
  });

  test('馆长/平台管理员 认证通过 -> 保持原角色', () => {
    assert.equal(shouldPromoteOnApproval('gym_admin'), false);
    assert.equal(shouldPromoteOnApproval('platform_admin'), false);
  });

  test('已是认证用户 -> 无需再提升', () => {
    assert.equal(shouldPromoteOnApproval('verified_climber'), false);
  });
});

describe('认证通过 (applyVerificationDecision, approved=true)', () => {
  test('普通访客认证通过 -> 升级成认证用户并盖认证时间', () => {
    const now = new Date('2026-08-02T10:00:00Z');
    const user = applyVerificationDecision(makeUser({ role: 'guest' }), true, undefined, 'verified_climber', now);
    assert.equal(user.role, 'verified_climber');
    assert.equal(user.verified_at, now);
  });

  test('定线员先设岗后认证 -> 角色保持 setter，不被降级 (回归测试)', () => {
    const now = new Date('2026-08-02T10:00:00Z');
    const user = applyVerificationDecision(makeUser({ role: 'setter' }), true, undefined, 'verified_climber', now);
    assert.equal(user.role, 'setter');
    assert.equal(user.verified_at, now); // 仍然盖上认证时间
  });

  test('认证通过会清除此前的驳回状态 (重新申请后回到干净通过态)', () => {
    const user = applyVerificationDecision(
      makeUser({ role: 'guest', rejected_at: new Date('2026-07-01'), rejection_reason: '资料不全' }),
      true,
      undefined,
    );
    assert.equal(user.rejected_at, null);
    assert.equal(user.rejection_reason, null);
  });
});

describe('认证驳回 (applyVerificationDecision, approved=false)', () => {
  test('驳回要留下原因并盖驳回时间', () => {
    const now = new Date('2026-08-02T10:00:00Z');
    const user = applyVerificationDecision(makeUser({ role: 'setter' }), false, '手机号无法验证', 'verified_climber', now);
    assert.equal(user.rejected_at, now);
    assert.equal(user.rejection_reason, '手机号无法验证');
  });

  test('驳回不改动角色和认证时间', () => {
    const user = applyVerificationDecision(makeUser({ role: 'setter' }), false, '原因');
    assert.equal(user.role, 'setter');
    assert.equal(user.verified_at, null);
  });

  test('未填原因时 rejection_reason 为 null 而非 undefined', () => {
    const user = applyVerificationDecision(makeUser(), false, undefined);
    assert.equal(user.rejection_reason, null);
  });
});

describe('待认证列表可见性 (isPendingVerification)', () => {
  test('已设角色未处理的申请 -> 出现在待认证列表', () => {
    assert.equal(isPendingVerification(makeUser({ role: 'setter' })), true);
  });

  test('驳回后 -> 从待认证列表消失 (回归测试)', () => {
    const user = applyVerificationDecision(makeUser({ role: 'setter' }), false, '原因');
    assert.equal(isPendingVerification(user), false);
  });

  test('通过后 -> 从待认证列表消失', () => {
    const user = applyVerificationDecision(makeUser({ role: 'guest' }), true, undefined);
    assert.equal(isPendingVerification(user), false);
  });

  test('仍是访客(未设角色) -> 不在待认证列表', () => {
    assert.equal(isPendingVerification(makeUser({ role: 'guest' })), false);
  });
});
