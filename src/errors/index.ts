import type { ErrorType } from "../generated/openapi/models/ErrorType.js";

export class ApiError extends Error {
    public code: number;
    public error: ErrorType;
    public description: string;

    constructor(code: number, error: ErrorType, message: string, description: string) {
        super(message);
        this.code = code;
        this.error = error;
        this.description = description;
    }
}

export class BadRequestError extends ApiError {
    constructor(error: ErrorType, message: string, description: string) {
        super(400, error, message, description);
    }
}

export class NotFoundError extends ApiError {
    constructor(error: ErrorType, message: string, description: string) {
        super(404, error, message, description);
    }
}