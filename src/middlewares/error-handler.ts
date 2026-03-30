import { ApiError, BadRequestError, NotFoundError } from "../errors/index.js";
import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse } from "../generated/openapi/models/ErrorResponse.js";
import { ErrorType } from "../generated/openapi/models/ErrorType.js";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof BadRequestError) {
        res.status(400).json(buildResponse(err));
    } else if (err instanceof NotFoundError) {
        res.status(404).json(buildResponse(err));
    } else {
        const error: ApiError = new ApiError(500,
            ErrorType.ServerError,
            'Internal Server Error',
            'An error occurred on the server');
        console.error('Internal Server Error', err);
        res.status(500).json(buildResponse(error));
    }
};

const buildResponse = (e: ApiError): ErrorResponse => {
    console.error('Error: ', e);
    const response: ErrorResponse = {
        status: { code: e.code, message: e.message },
        error: e.error,
        description: e.description
    };
    return response;
}