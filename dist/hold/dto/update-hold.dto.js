"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHoldDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_hold_dto_1 = require("./create-hold.dto");
class UpdateHoldDto extends (0, mapped_types_1.PartialType)(create_hold_dto_1.CreateHoldDto) {
}
exports.UpdateHoldDto = UpdateHoldDto;
//# sourceMappingURL=update-hold.dto.js.map