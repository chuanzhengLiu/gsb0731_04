import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { Ascent } from '../entities/ascent.entity';
import { User } from '../entities/user.entity';
import { Wall } from '../entities/wall.entity';
export interface RouteHeat {
    route_id: number;
    route_name: string;
    grade: string;
    total_ascents: number;
    sent_count: number;
    send_rate: number;
}
export interface ColdRoute {
    route_id: number;
    route_name: string;
    grade: string;
    days_since_last_ascent: number;
    open_date: Date | null;
}
export interface SetterWorkload {
    setter_id: number;
    setter_name: string;
    routes_set: number;
}
export declare class AnalyticsService {
    private routeRepository;
    private ascentRepository;
    private userRepository;
    private wallRepository;
    constructor(routeRepository: Repository<Route>, ascentRepository: Repository<Ascent>, userRepository: Repository<User>, wallRepository: Repository<Wall>);
    getRouteHeat(gymId: number): Promise<RouteHeat[]>;
    getColdRoutes(gymId: number): Promise<ColdRoute[]>;
    getSetterWorkload(gymId: number, month: string): Promise<SetterWorkload[]>;
    getActiveUsers(gymId: number): Promise<{
        weekly_active_users: number;
        total_members: number;
        avg_routes_per_user: number;
    }>;
    getPyramid(userId: number): Promise<Record<string, number>>;
    getProgress(userId: number): Promise<{
        date: string;
        count: number;
    }[]>;
    getStyleAnalysis(userId: number): Promise<Record<string, number>>;
}
