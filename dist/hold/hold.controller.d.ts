import { HoldService } from './hold.service';
import { UpdateHoldDto } from './dto/update-hold.dto';
import { BatchCreateHoldDto } from './dto/batch-create-hold.dto';
export declare class HoldController {
    private readonly holdService;
    constructor(holdService: HoldService);
    findAllByRoute(routeId: number): Promise<import("../entities/hold.entity").Hold[]>;
    batchCreate(routeId: number, batchCreateHoldDto: BatchCreateHoldDto): Promise<import("../entities/hold.entity").Hold[]>;
    update(id: number, updateHoldDto: UpdateHoldDto): Promise<import("../entities/hold.entity").Hold>;
    remove(id: number): Promise<void>;
}
