import { AscentType } from '../../entities/ascent.entity';
export declare class CreateAscentDto {
    route_id: number;
    ascent_type: AscentType;
    attempts: number;
    felt_grade?: string;
    video_url?: string;
    notes?: string;
}
