import { BadRequestError } from "../../errors/index.js"
import { ErrorType } from "../../generated/openapi/models/ErrorType.js";

export enum StorageType {
    GRIDFS = 'gridfs'
}

export const getStorageTypeFromValue = (storageType: string): StorageType =>{
    if (Object.values(StorageType).includes(storageType as StorageType)) {
        return storageType as StorageType
    }

    throw new BadRequestError(ErrorType.BadRequest, 'Bad request', 'Invalid storage type');
}