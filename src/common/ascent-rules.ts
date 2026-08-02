// Single source of truth for climbing statistics rules. Keep all completion
// ("完攀") and date-range logic here so the calendar, route-heat and pyramid
// stats can never drift apart again. Uses only type-only imports so it stays
// dependency-free and unit-testable without a DB / Nest runtime.
import type { AscentType } from '../entities/ascent.entity';

// A completion is FLASH / ONSIGHT / REDPOINT. HIGH_POINT (reached a high point
// but didn't top out) and FALL (failed attempt) are NOT completions and must
// never be counted as sent. The string literals mirror the AscentType enum.
export const SENT_ASCENT_TYPES = ['flash', 'onsight', 'redpoint'] as const;

export function isSentAscent(type: AscentType | string): boolean {
  return (SENT_ASCENT_TYPES as readonly string[]).includes(type as string);
}

// Inclusive calendar-month range: [first day 00:00:00.000, last day 23:59:59.999].
// The end-of-day on the last day is critical — without it, ascents logged later
// on the final day of the month fall outside the range and disappear.
export function getMonthDateRange(month: string): { startDate: Date; endDate: Date } {
  const [year, monthNum] = month.split('-').map(Number);
  const startDate = new Date(year, monthNum - 1, 1);
  const endDate = new Date(year, monthNum, 0);
  endDate.setHours(23, 59, 59, 999);
  return { startDate, endDate };
}
