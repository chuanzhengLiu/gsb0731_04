import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isSentAscent, SENT_ASCENT_TYPES, getMonthDateRange } from './ascent-rules.ts';

// These tests lock down the completion ("完攀") statistics rules shared by the
// calendar, route-heat and pyramid pages. If someone changes the rule so that
// e.g. high_point counts as a completion, or redpoint stops counting, these
// tests fail. Run with: npm test

describe('完攀口径 (isSentAscent)', () => {
  test('红点(redpoint)算完成', () => {
    assert.equal(isSentAscent('redpoint'), true);
  });

  test('flash / onsight 算完成', () => {
    assert.equal(isSentAscent('flash'), true);
    assert.equal(isSentAscent('onsight'), true);
  });

  test('高点(high_point)不算完成', () => {
    assert.equal(isSentAscent('high_point'), false);
  });

  test('脱落(fall)不算完成', () => {
    assert.equal(isSentAscent('fall'), false);
  });

  test('完攀类型集合恰好是 flash/onsight/redpoint', () => {
    assert.deepEqual([...SENT_ASCENT_TYPES].sort(), ['flash', 'onsight', 'redpoint']);
  });
});

describe('月度日历区间 (getMonthDateRange)', () => {
  test('月底最后一天的攀爬不能丢：区间覆盖到当天 23:59:59.999', () => {
    // 2月是最容易出错的边界（28/29天）
    const { startDate, endDate } = getMonthDateRange('2026-02');

    assert.equal(startDate.getDate(), 1);
    assert.equal(startDate.getMonth(), 1); // 0-based, 1 = February
    assert.equal(startDate.getHours(), 0);

    assert.equal(endDate.getMonth(), 1); // still February, not March
    assert.equal(endDate.getDate(), 28); // 2026 is not a leap year
    assert.equal(endDate.getHours(), 23);
    assert.equal(endDate.getMinutes(), 59);
    assert.equal(endDate.getSeconds(), 59);
    assert.equal(endDate.getMilliseconds(), 999);
  });

  test('最后一天晚上记录的攀爬落在区间内 (回归测试)', () => {
    const { startDate, endDate } = getMonthDateRange('2026-01');
    // 1月31日 22:30 的一次攀爬
    const lateAscent = new Date(2026, 0, 31, 22, 30, 0);
    assert.ok(lateAscent >= startDate && lateAscent <= endDate);
  });

  test('31天月份的最后一天是 31 号', () => {
    const { endDate } = getMonthDateRange('2026-07');
    assert.equal(endDate.getDate(), 31);
  });
});
