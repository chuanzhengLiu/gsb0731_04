"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const upload_service_1 = require("./upload.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const VIDEO_MAX_SIZE = 50 * 1024 * 1024;
const imageFileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(ext)) {
        return cb(new common_1.BadRequestException('仅支持 jpg、png、gif、webp 格式的图片'), false);
    }
    cb(null, true);
};
const videoFileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/webm'];
    const allowedExtensions = ['.mp4', '.webm'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.includes(file.mimetype) || !allowedExtensions.includes(ext)) {
        return cb(new common_1.BadRequestException('仅支持 mp4、webm 格式的视频'), false);
    }
    cb(null, true);
};
const getStorage = (subDir) => {
    return (0, multer_1.diskStorage)({
        destination: (req, file, cb) => {
            const uploadDir = path.resolve(process.env.UPLOAD_DIR || './uploads');
            const targetDir = path.join(uploadDir, subDir);
            const fs = require('fs');
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            cb(null, targetDir);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            const uniqueName = `${(0, uuid_1.v4)()}${ext}`;
            cb(null, uniqueName);
        },
    });
};
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async uploadImage(file) {
        return this.uploadService.uploadImage(file);
    }
    async uploadVideo(file) {
        return this.uploadService.uploadVideo(file);
    }
    async getFile(token, res) {
        try {
            const { stream, mimeType } = this.uploadService.getFileByToken(token);
            res.setHeader('Content-Type', mimeType);
            stream.pipe(res);
        }
        catch (error) {
            res.status(404).json({ message: '文件不存在或链接已过期' });
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('upload/image'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: getStorage('images'),
        fileFilter: imageFileFilter,
        limits: { fileSize: IMAGE_MAX_SIZE },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload/video'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: getStorage('videos'),
        fileFilter: videoFileFilter,
        limits: { fileSize: VIDEO_MAX_SIZE },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)('/files/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map