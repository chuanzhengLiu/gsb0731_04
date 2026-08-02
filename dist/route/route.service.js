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
exports.RouteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const route_entity_1 = require("../entities/route.entity");
let RouteService = class RouteService {
    constructor(routeRepository) {
        this.routeRepository = routeRepository;
    }
    create(wallId, createRouteDto) {
        const route = this.routeRepository.create({
            ...createRouteDto,
            wall_id: wallId,
        });
        return this.routeRepository.save(route);
    }
    findAllByWall(wallId, filters) {
        const options = {
            where: { wall_id: wallId },
        };
        if (filters?.type) {
            options.where.type = filters.type;
        }
        if (filters?.grade) {
            options.where.grade = filters.grade;
        }
        if (filters?.status) {
            options.where.status = filters.status;
        }
        return this.routeRepository.find(options);
    }
    findOne(id) {
        return this.routeRepository.findOne({ where: { id } });
    }
    async update(id, updateRouteDto) {
        const route = await this.findOne(id);
        if (!route) {
            throw new common_1.NotFoundException(`Route with id ${id} not found`);
        }
        Object.assign(route, updateRouteDto);
        return this.routeRepository.save(route);
    }
    async updateStatus(id, status) {
        const route = await this.findOne(id);
        if (!route) {
            throw new common_1.NotFoundException(`Route with id ${id} not found`);
        }
        route.status = status;
        return this.routeRepository.save(route);
    }
    async remove(id) {
        const result = await this.routeRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Route with id ${id} not found`);
        }
    }
};
exports.RouteService = RouteService;
exports.RouteService = RouteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(route_entity_1.Route)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RouteService);
//# sourceMappingURL=route.service.js.map