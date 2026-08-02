import { WallService } from './wall.service';
import { CreateWallDto } from './dto/create-wall.dto';
import { UpdateWallDto } from './dto/update-wall.dto';
export declare class WallController {
    private readonly wallService;
    constructor(wallService: WallService);
    findAllByGym(gymId: number): Promise<import("../entities/wall.entity").Wall[]>;
    findOne(id: number): Promise<import("../entities/wall.entity").Wall | null>;
    create(gymId: number, createWallDto: CreateWallDto): Promise<import("../entities/wall.entity").Wall>;
    update(id: number, updateWallDto: UpdateWallDto): Promise<import("../entities/wall.entity").Wall>;
    remove(id: number): Promise<void>;
}
