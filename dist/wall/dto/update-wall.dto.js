"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWallDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_wall_dto_1 = require("./create-wall.dto");
class UpdateWallDto extends (0, mapped_types_1.PartialType)(create_wall_dto_1.CreateWallDto) {
}
exports.UpdateWallDto = UpdateWallDto;
//# sourceMappingURL=update-wall.dto.js.map