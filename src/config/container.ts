import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage/lib/gridfs.js";
import { MONGO_URI } from "../shared/constants/index.js";
import { Db } from 'mongodb';
import type { FileRepository } from "../repositories/interfaces/file-repository.interface.js";
import { FileRepositoryImpl } from "../repositories/file.repository.js";
import type { FileService } from "../services/interfaces/file-service.interface.js";
import { FileServiceImpl } from "../services/file.service.js";
import { GridFsStorageStrategy } from "../services/strategies/gridfs-storage.strategy.js";
import { StorageStrategyFactory } from "../services/strategies/storage-strategy.factory.js";

export class DIContainer {
    private static _gridFsStorage: GridFsStorage | undefined;
    private static _fileRepository: FileRepository | undefined;
    private static _fileService: FileService | undefined;
    private static _gridFsStorageStrategy: GridFsStorageStrategy | undefined;
    private static _storageStrategyFactory: StorageStrategyFactory | undefined;

    private constructor() { }

    public static async initialize(): Promise<typeof mongoose> {
        try {
            const connection = await mongoose.connect(MONGO_URI);
            console.log(`[DI] MongoDB Connected: ${MONGO_URI}`);
            return connection;
        } catch (error) {
            console.error('[DI] Database connection failed:', error);
            process.exit(1);
        }
    }

    public static get gridFsStorageStrategy(): GridFsStorageStrategy {
        this._gridFsStorageStrategy ??= new GridFsStorageStrategy(this.mongoClient);
        return this._gridFsStorageStrategy;
    }

    public static get storageStrategyFactory(): StorageStrategyFactory {
        this._storageStrategyFactory ??= new StorageStrategyFactory(this.gridFsStorageStrategy);
        return this._storageStrategyFactory;
    }

    public static get fileRepository(): FileRepository {
        this._fileRepository ??= new FileRepositoryImpl(this.mongoClient);
        return this._fileRepository;
    }

    public static get fileService(): FileService {
        this._fileService ??= new FileServiceImpl(this.fileRepository, this.storageStrategyFactory);
        return this._fileService;
    }

    public static get mongoClient(): Db {
        if (!mongoose.connection.db) {
            throw new Error("Database not initialized. Call DIContainer.initialize() first.");
        }
        return mongoose.connection.db;
    }

}
