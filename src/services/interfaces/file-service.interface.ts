import type { StorageType } from "../../shared/enums/storage-type.enum.js";
import type { FileDto } from "../../types/index.js";

export interface FileService {
    uploadFile(file: Express.Multer.File | undefined, type: StorageType, bucket: string): Promise<FileDto>;
}