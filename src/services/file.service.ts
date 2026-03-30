import { BadRequestError } from "../errors/index.js";
import { getStorageTypeFromValue, type StorageType } from "../shared/enums/storage-type.enum.js";
import type { FileRepository } from "../repositories/interfaces/file-repository.interface.js";
import type { FileService } from "./interfaces/file-service.interface.js";
import { StorageStrategyFactory } from "./strategies/storage-strategy.factory.js";
import type { FileDto } from "../types/index.js";
import { FileMapper } from "../mappers/file.mapper.js";
import { ErrorType } from "../generated/openapi/models/ErrorType.js";

export class FileServiceImpl implements FileService {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly storageStrategyFactory: StorageStrategyFactory
    ) { }

    public async uploadFile(file: Express.Multer.File | undefined, type: StorageType, bucket: string): Promise<FileDto> {
        if (!file) {
            throw new BadRequestError(ErrorType.BadRequest, 'Bad request', 'No file provided');
        }

        const storageType = getStorageTypeFromValue(type);

        // Get storage strategy
        const strategy = this.storageStrategyFactory.getStorageStrategy(storageType);

        // Upload the file
        const uploadedFile = await strategy.uploadFile(file, bucket);

        // Save file metadata
        const fileMetadata = await this.fileRepository.create({
            filename: file.originalname,
            type: file.mimetype,
            size: file.size,
            bucket: uploadedFile.bucket,
            storage: uploadedFile.storage,
            storageId: uploadedFile.storageId
        });

        // Return file dto
        return FileMapper.toDto(fileMetadata);
    }
}