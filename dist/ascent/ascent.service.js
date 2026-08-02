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
exports.AscentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ascent_entity_1 = require("../entities/ascent.entity");
const user_entity_1 = require("../entities/user.entity");
let AscentService = class AscentService {
    constructor(ascentRepository) {
        this.ascentRepository = ascentRepository;
    }
    async create(userId, createAscentDto) {
        const ascent = this.ascentRepository.create({
            ...createAscentDto,
            user_id: userId,
        });
        return this.ascentRepository.save(ascent);
    }
    async findAll(filters) {
        const options = {
            where: {},
            order: { created_at: 'DESC' },
            relations: ['route', 'user'],
        };
        if (filters?.route_id) {
            options.where.route_id = filters.route_id;
        }
        if (filters?.user_id) {
            options.where.user_id = filters.user_id;
        }
        if (filters?.start_date && filters?.end_date) {
            options.where.created_at = (0, typeorm_2.Between)(new Date(filters.start_date), new Date(filters.end_date + ' 23:59:59'));
        }
        const ascents = await this.ascentRepository.find(options);
        return ascents.map((ascent) => ({
            ...ascent,
            route_name: ascent.route?.name,
            route_grade: ascent.route?.grade,
            user_name: ascent.user?.name,
        }));
    }
    findOne(id) {
        return this.ascentRepository.findOne({ where: { id } });
    }
    async findOneFlattened(id) {
        const ascent = await this.ascentRepository.findOne({
            where: { id },
            relations: ['route', 'user'],
        });
        if (!ascent)
            return null;
        return {
            ...ascent,
            route_name: ascent.route?.name,
            route_grade: ascent.route?.grade,
            user_name: ascent.user?.name,
        };
    }
    async update(id, userId, userRole, updateAscentDto) {
        const ascent = await this.findOne(id);
        if (!ascent) {
            throw new common_1.NotFoundException(`Ascent with id ${id} not found`);
        }
        if (ascent.user_id !== userId && userRole !== user_entity_1.UserRole.GYM_ADMIN && userRole !== user_entity_1.UserRole.PLATFORM_ADMIN) {
            throw new common_1.ForbiddenException('You can only update your own ascents');
        }
        Object.assign(ascent, updateAscentDto);
        return this.ascentRepository.save(ascent);
    }
    async remove(id, userId, userRole) {
        const ascent = await this.findOne(id);
        if (!ascent) {
            throw new common_1.NotFoundException(`Ascent with id ${id} not found`);
        }
        if (ascent.user_id !== userId && userRole !== user_entity_1.UserRole.GYM_ADMIN && userRole !== user_entity_1.UserRole.PLATFORM_ADMIN) {
            throw new common_1.ForbiddenException('You can only delete your own ascents');
        }
        await this.ascentRepository.delete(id);
    }
    async getAscentCalendar(userId, month) {
        const [year, monthNum] = month.split('-').map(Number);
        const startDate = new Date(year, monthNum - 1, 1);
        const endDate = new Date(year, monthNum, 0);
        endDate.setHours(23, 59, 59, 999);
        const ascents = await this.ascentRepository.find({
            where: {
                user_id: userId,
                created_at: (0, typeorm_2.Between)(startDate, endDate),
            },
            order: { created_at: 'ASC' },
        });
        const calendar = {};
        const sentTypes = [ascent_entity_1.AscentType.FLASH, ascent_entity_1.AscentType.ONSIGHT, ascent_entity_1.AscentType.REDPOINT];
        for (const ascent of ascents) {
            const d = ascent.created_at;
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (!calendar[dateStr]) {
                calendar[dateStr] = { total: 0, sent: 0 };
            }
            calendar[dateStr].total += 1;
            if (sentTypes.includes(ascent.ascent_type)) {
                calendar[dateStr].sent += 1;
            }
        }
        return calendar;
    }
};
exports.AscentService = AscentService;
exports.AscentService = AscentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ascent_entity_1.Ascent)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AscentService);
//# sourceMappingURL=ascent.service.js.map