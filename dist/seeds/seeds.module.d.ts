import { OnModuleInit } from '@nestjs/common';
import { SeedsService } from './seeds.service';
export declare class SeedsModule implements OnModuleInit {
    private readonly seedsService;
    private readonly logger;
    constructor(seedsService: SeedsService);
    onModuleInit(): Promise<void>;
}
