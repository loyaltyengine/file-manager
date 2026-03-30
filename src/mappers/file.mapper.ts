import type { ClientFile } from "../generated/openapi/models/ClientFile.js";
import type { FileModel } from "../models/file.model.js";
import type { FileDto } from "../types/index.js";
export class FileMapper {
    public static toDto(file: FileModel): FileDto {
        return {
            id: file.id,
            filename: file.filename,
            type: file.type,
            size: file.size,
            bucket: file.bucket,
            storage: file.storage,
            storageId: file.storageId,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt
        }
    }

    public static toClient(file: FileDto): ClientFile {
        return {
            id: file.id,
            filename: file.filename,
            type: file.type,
            size: file.size,
            bucket: file.bucket,
            storage: file.storage,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt
        }
    }
}