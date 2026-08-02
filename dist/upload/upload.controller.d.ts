import { Response } from 'express';
import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
        token: string;
        filename: string;
        size: number;
        mimeType: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        url: string;
        token: string;
        filename: string;
        size: number;
        mimeType: string;
    }>;
    getFile(token: string, res: Response): Promise<void>;
}
