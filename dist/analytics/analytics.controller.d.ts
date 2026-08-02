import { AnalyticsService, RouteHeat, ColdRoute, SetterWorkload } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getRouteHeat(gymId: number): Promise<RouteHeat[]>;
    getColdRoutes(gymId: number): Promise<ColdRoute[]>;
    getSetterWorkload(gymId: number, month: string): Promise<SetterWorkload[]>;
    getActiveUsers(gymId: number): Promise<{
        weekly_active_users: number;
        total_members: number;
        avg_routes_per_user: number;
    }>;
    getPyramid(req: any): Promise<Record<string, number>>;
    getProgress(req: any): Promise<{
        date: string;
        count: number;
    }[]>;
    getStyleAnalysis(req: any): Promise<Record<string, number>>;
}
