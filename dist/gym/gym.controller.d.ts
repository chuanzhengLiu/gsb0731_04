import { GymService } from './gym.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
export declare class GymController {
    private readonly gymService;
    constructor(gymService: GymService);
    findAll(): Promise<import("../entities/gym.entity").Gym[]>;
    findOne(id: number): Promise<import("../entities/gym.entity").Gym | null>;
    create(createGymDto: CreateGymDto): Promise<import("../entities/gym.entity").Gym>;
    update(id: number, updateGymDto: UpdateGymDto): Promise<import("../entities/gym.entity").Gym>;
}
