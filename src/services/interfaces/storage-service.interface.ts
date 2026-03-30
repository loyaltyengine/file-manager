import type { StorageFileDto } from "../../types/index.js";

export interface StorageService {
    uploadFile(file: Express.Multer.File, bucket: string): Promise<StorageFileDto>;
    deleteFile(fileId: string, bucket?: string): Promise<void>;
}