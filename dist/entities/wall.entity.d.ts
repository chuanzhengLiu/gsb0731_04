import { Gym } from './gym.entity';
import { Route } from './route.entity';
export declare class Wall {
    id: number;
    gym_id: number;
    name: string;
    photo_url: string;
    polygon_coords: object;
    created_at: Date;
    updated_at: Date;
    gym: Gym;
    routes: Route[];
}
