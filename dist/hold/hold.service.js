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
exports.HoldService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hold_entity_1 = require("../entities/hold.entity");
let HoldService = class HoldService {
    constructor(holdRepository) {
        this.holdRepository = holdRepository;
    }
    create(routeId, createHoldDto) {
        const hold = this.holdRepository.create({
            ...createHoldDto,
            route_id: routeId,
        });
        return this.holdRepository.save(hold);
    }
    async batchCreate(routeId, createHoldDtos) {
        const holds = createHoldDtos.map((dto) => this.holdRepository.create({
            ...dto,
            route_id: routeId,
        }));
        return this.holdRepository.save(holds);
    }
    findAllByRoute(routeId) {
        return this.holdRepository.find({ where: { route_id: routeId } });
    }
    findOne(id) {
        return this.holdRepository.findOne({ where: { id } });
    }
    async update(id, updateHoldDto) {
        const hold = await this.findOne(id);
        if (!hold) {
            throw new common_1.NotFoundException(`Hold with id ${id} not found`);
        }
        Object.assign(hold, updateHoldDto);
        return this.holdRepository.save(hold);
    }
    async remove(id) {
        const result = await this.holdRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Hold with id ${id} not found`);
        }
    }
};
exports.HoldService = HoldService;
exports.HoldService = HoldService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hold_entity_1.Hold)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HoldService);
//# sourceMappingURL=hold.service.js.map