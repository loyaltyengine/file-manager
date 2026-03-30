import { Db } from 'mongodb';
import { randomUUID } from 'node:crypto';
import type { CreateFileData, FileRepository } from "./interfaces/file-repository.interface.js";
import type { FileModel } from "../models/file.model.js";

export class FileRepositoryImpl implements FileRepository {
    private readonly FILES_COLLECTION = 'files';

    public constructor(private readonly mongoClient: Db) { }

    public async create(payload: CreateFileData): Promise<FileModel> {
        const filesCollection = this.mongoClient.collection(this.FILES_COLLECTION);
        const now = new Date();
        const file: FileModel = {
            id: randomUUID(),
            filename: payload.filename,
            type: payload.type,
            size: payload.size,
            bucket: payload.bucket,
            storage: payload.storage,
            storageId: payload.storageId,
            createdAt: now,
            updatedAt: now
        };

        await filesCollection.insertOne(file);
        return file;
    }
}