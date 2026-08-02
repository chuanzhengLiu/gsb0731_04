"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wall_entity_1 = require("../entities/wall.entity");
let WallService = class WallService {
    constructor(wallRepository) {
        this.wallRepository = wallRepository;
    }
    create(gymId, createWallDto) {
        const wall = this.wallRepository.create({
            ...createWallDto,
            gym_id: gymId,
        });
        return this.wallRepository.save(wall);
    }
    findAllByGym(gymId) {
        return this.wallRepository.find({ where: { gym_id: gymId } });
    }
    findOne(id) {
        return this.wallRepository.findOne({ where: { id } });
    }
    async update(id, updateWallDto) {
        const wall = await this.findOne(id);
        if (!wall) {
            throw new common_1.NotFoundException(`Wall with id ${id} not found`);
        }
        Object.assign(wall, updateWallDto);
        return this.wallRepository.save(wall);
    }
    async remove(id) {
        const result = await this.wallRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Wall with id ${id} not found`);
        }
    }
};
exports.WallService = WallService;
exports.WallService = WallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wall_entity_1.Wall)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WallService);
//# sourceMappingURL=wall.service.js.map