import { Route } from './route.entity';
export declare enum HoldType {
    HAND = "hand",
    FOOT = "foot",
    START = "start",
    END = "end"
}
export declare class Hold {
    id: number;
    route_id: number;
    position_x: number;
    position_y: number;
    type: HoldType;
    route: Route;
}
