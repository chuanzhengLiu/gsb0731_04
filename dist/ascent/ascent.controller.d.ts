import { AscentService } from './ascent.service';
import { CreateAscentDto } from './dto/create-ascent.dto';
import { UpdateAscentDto } from './dto/update-ascent.dto';
export declare class AscentController {
    private readonly ascentService;
    constructor(ascentService: AscentService);
    private isAdmin;
    findAll(route_id?: string, user_id?: string, start_date?: string, end_date?: string, req?: any): Promise<any[]>;
    findOne(id: number, req: any): Promise<any>;
    create(createAscentDto: CreateAscentDto, req: any): Promise<import("../entities/ascent.entity").Ascent>;
    update(id: number, updateAscentDto: UpdateAscentDto, req: any): Promise<import("../entities/ascent.entity").Ascent>;
    remove(id: number, req: any): Promise<void>;
    getAscentCalendar(userId: number, month: string, req: any): Promise<Record<string, {
        total: number;
        sent: number;
    }>>;
}
