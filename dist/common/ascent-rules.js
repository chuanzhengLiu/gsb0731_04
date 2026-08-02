"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENT_ASCENT_TYPES = void 0;
exports.isSentAscent = isSentAscent;
exports.getMonthDateRange = getMonthDateRange;
exports.SENT_ASCENT_TYPES = ['flash', 'onsight', 'redpoint'];
function isSentAscent(type) {
    return exports.SENT_ASCENT_TYPES.includes(type);
}
function getMonthDateRange(month) {
    const [year, monthNum] = month.split('-').map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0);
    endDate.setHours(23, 59, 59, 999);
    return { startDate, endDate };
}
//# sourceMappingURL=ascent-rules.js.map