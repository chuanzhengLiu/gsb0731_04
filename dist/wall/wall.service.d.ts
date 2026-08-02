import { Repository } from 'typeorm';
import { Wall } from '../entities/wall.entity';
import { CreateWallDto } from './dto/create-wall.dto';
import { UpdateWallDto } from './dto/update-wall.dto';
export declare class WallService {
    private wallRepository;
    constructor(wallRepository: Repository<Wall>);
    create(gymId: number, createWallDto: CreateWallDto): Promise<Wall>;
    findAllByGym(gymId: number): Promise<Wall[]>;
    findOne(id: number): Promise<Wall | null>;
    update(id: number, updateWallDto: UpdateWallDto): Promise<Wall>;
    remove(id: number): Promise<void>;
}
