import { Repository } from 'typeorm';
import { Hold } from '../entities/hold.entity';
import { CreateHoldDto } from './dto/create-hold.dto';
import { UpdateHoldDto } from './dto/update-hold.dto';
export declare class HoldService {
    private holdRepository;
    constructor(holdRepository: Repository<Hold>);
    create(routeId: number, createHoldDto: CreateHoldDto): Promise<Hold>;
    batchCreate(routeId: number, createHoldDtos: CreateHoldDto[]): Promise<Hold[]>;
    findAllByRoute(routeId: number): Promise<Hold[]>;
    findOne(id: number): Promise<Hold | null>;
    update(id: number, updateHoldDto: UpdateHoldDto): Promise<Hold>;
    remove(id: number): Promise<void>;
}
