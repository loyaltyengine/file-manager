import type { StorageService } from "../interfaces/storage-service.interface.js";
import { GridFSBucket, Db } from 'mongodb';
import { Readable } from "node:stream";
import type { StorageFileDto } from "../../types/index.js";

export class GridFsStorageStrategy implements StorageService {

    constructor(private readonly mongoClient: Db) { }

    public uploadFile(file: Express.Multer.File, bucketName: string): Promise<StorageFileDto> {
        const bucket = new GridFSBucket(this.mongoClient, { bucketName });

        return new Promise<StorageFileDto>((resolve, reject) => {
            const uploadStream = bucket.openUploadStream(file.originalname);

            Readable.from(file.buffer).pipe(uploadStream);

            uploadStream.on('finish', async () => {
                resolve({
                    storageId: uploadStream.id.toString(),
                    bucket: bucketName,
                    storage: 'gridfs',
                    size: file.size
                });
            });

            uploadStream.on('error', reject);
        }).catch((error) => {
            throw new Error(error instanceof Error ? error.message : String(error));
        });
    }

    deleteFile(_fileId: string, _bucket?: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}