import type { FileModel } from "../../models/file.model.js";

export interface CreateFileData {
    filename: string;
    type: string;
    size: number;
    bucket: string;
    storage: string;
    storageId: string;
}

export interface FileRepository {
    create(data: CreateFileData): Promise<FileModel>;
}