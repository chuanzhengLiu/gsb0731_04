import * as fs from 'fs';
export declare class UploadService {
    private uploadDir;
    private tokenStore;
    constructor();
    private ensureUploadDir;
    private startTokenCleanup;
    private validateImageFile;
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
    getFileByToken(token: string): {
        stream: fs.ReadStream;
        mimeType: string;
        filePath: string;
    };
    private generateToken;
    getImageMaxSize(): number;
    getVideoMaxSize(): number;
}
