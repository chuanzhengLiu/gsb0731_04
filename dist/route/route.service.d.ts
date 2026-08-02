import { Repository } from 'typeorm';
import { Route, RouteType, RouteStatus } from '../entities/route.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
export declare class RouteService {
    private routeRepository;
    constructor(routeRepository: Repository<Route>);
    create(wallId: number, createRouteDto: CreateRouteDto): Promise<Route>;
    findAllByWall(wallId: number, filters?: {
        type?: RouteType;
        grade?: string;
        status?: RouteStatus;
    }): Promise<Route[]>;
    findOne(id: number): Promise<Route | null>;
    update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route>;
    updateStatus(id: number, status: RouteStatus): Promise<Route>;
    remove(id: number): Promise<void>;
}
