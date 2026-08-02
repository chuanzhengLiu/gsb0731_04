import { Repository } from 'typeorm';
import { Ascent } from '../entities/ascent.entity';
import { UserRole } from '../entities/user.entity';
import { CreateAscentDto } from './dto/create-ascent.dto';
import { UpdateAscentDto } from './dto/update-ascent.dto';
export declare class AscentService {
    private ascentRepository;
    constructor(ascentRepository: Repository<Ascent>);
    create(userId: number, createAscentDto: CreateAscentDto): Promise<Ascent>;
    findAll(filters?: {
        route_id?: number;
        user_id?: number;
        start_date?: string;
        end_date?: string;
    }): Promise<any[]>;
    findOne(id: number): Promise<Ascent | null>;
    findOneFlattened(id: number): Promise<any>;
    update(id: number, userId: number, userRole: UserRole, updateAscentDto: UpdateAscentDto): Promise<Ascent>;
    remove(id: number, userId: number, userRole: UserRole): Promise<void>;
    getAscentCalendar(userId: number, month: string): Promise<Record<string, {
        total: number;
        sent: number;
    }>>;
}
