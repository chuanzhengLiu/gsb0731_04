"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAscentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ascent_dto_1 = require("./create-ascent.dto");
class UpdateAscentDto extends (0, mapped_types_1.PartialType)(create_ascent_dto_1.CreateAscentDto) {
}
exports.UpdateAscentDto = UpdateAscentDto;
//# sourceMappingURL=update-ascent.dto.js.map