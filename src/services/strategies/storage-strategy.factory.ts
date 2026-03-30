import { BadRequestError } from "../../errors/index.js";
import { ErrorType } from "../../generated/openapi/models/ErrorType.js";
import { StorageType } from "../../shared/enums/storage-type.enum.js";
import type { StorageService } from "../interfaces/storage-service.interface.js";
import type { GridFsStorageStrategy } from "./gridfs-storage.strategy.js";

export class StorageStrategyFactory {
    public constructor(
        private readonly gridFsStorageStrategy: GridFsStorageStrategy
    ) { }

    public getStorageStrategy(storageType: StorageType): StorageService {
        if (storageType !== StorageType.GRIDFS) {
            throw new BadRequestError(ErrorType.BadRequest, 'Bad request', 'Unsupported storage type');
        }

        return this.gridFsStorageStrategy;
    }
}