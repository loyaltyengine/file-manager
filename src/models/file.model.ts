export interface FileModel {
    id: string;
    filename: string;
    type: string;
    size: number;
    bucket: string;
    storage: string;
    storageId: string;
    createdAt: Date;
    updatedAt: Date;
}