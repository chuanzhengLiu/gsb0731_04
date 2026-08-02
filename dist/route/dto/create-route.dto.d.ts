import { RouteType, RouteStatus } from '../../entities/route.entity';
export declare class CreateRouteDto {
    name: string;
    type: RouteType;
    path_coords?: object;
    grade: string;
    color?: string;
    setter_id?: number;
    status?: RouteStatus;
    tags?: string[];
    length?: number;
    open_date?: string;
    planned_remove_date?: string;
}
