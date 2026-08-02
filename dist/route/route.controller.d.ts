import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UpdateRouteStatusDto } from './dto/update-route-status.dto';
import { RouteType, RouteStatus } from '../entities/route.entity';
export declare class RouteController {
    private readonly routeService;
    constructor(routeService: RouteService);
    findAllByWall(wallId: number, type?: RouteType, grade?: string, status?: RouteStatus): Promise<import("../entities/route.entity").Route[]>;
    findOne(id: number): Promise<import("../entities/route.entity").Route | null>;
    create(wallId: number, createRouteDto: CreateRouteDto): Promise<import("../entities/route.entity").Route>;
    update(id: number, updateRouteDto: UpdateRouteDto): Promise<import("../entities/route.entity").Route>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, updateRouteStatusDto: UpdateRouteStatusDto): Promise<import("../entities/route.entity").Route>;
}
