import { StorageType } from "../enums/storage-type.enum.js";

export const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/filedb';

export const DEFAULT_STORAGE = StorageType.GRIDFS;
export const DEFAULT_BUCKET = 'general_uploads';