import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { DIContainer } from '../config/container.js';
import { StorageType } from '../shared/enums/storage-type.enum.js';
import {DEFAULT_STORAGE } from '../shared/constants/index.js';
import type { FileResponse } from '../generated/openapi/models/FileResponse.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    const fileService = DIContainer.fileService;
    // Request
    const storageType =  req.query.storageType as StorageType || DEFAULT_STORAGE;
    const bucket = req.query.bucket as string
    const file = req.file;

    // Upload file
    const result = await fileService.uploadFile(file, storageType, bucket);

    // Response
    const response: FileResponse = {
        status: { code: 200, message: 'File uploaded successfully' },
        file: {
            id: result.id,
            filename: result.filename,
            type: result.type,
            size: result.size,
            bucket: result.bucket,
            storage: result.storage,
            createdAt: result.createdAt.toISOString(),
            updatedAt: result.updatedAt.toISOString()
        }
    }

    res.status(200).json(response);
});

export default router;