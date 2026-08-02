import type { AscentType } from '../entities/ascent.entity';
export declare const SENT_ASCENT_TYPES: readonly ["flash", "onsight", "redpoint"];
export declare function isSentAscent(type: AscentType | string): boolean;
export declare function getMonthDateRange(month: string): {
    startDate: Date;
    endDate: Date;
};
