export interface FileDto {
    id: string
    filename: string
    type: string
    size: number
    bucket: string
    storage: string
    storageId: string
    createdAt: Date
    updatedAt: Date
}

export interface StorageFileDto {
    bucket: string
    storage: string
    storageId: string
    size: number
}

