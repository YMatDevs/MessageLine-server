import { StatusCodes } from "./constants.js";
import type { APIFailureResponse } from "./types.js";
import type { Response } from "express";


export class APIError extends Error {

    #status: number;
    #errorDetails: object | null;

    constructor(message: string, status: number, errorDetails: object | null = null) {
        super(message);
        this.#status = status;
        this.#errorDetails = errorDetails;
    }

    sendResponse(res: Response): Response<APIFailureResponse> {
        return res.status(this.#status).json({ success: false, message: this.message, errorDetails: this.#errorDetails });
    }
}

export class Unauthorized extends APIError {
    constructor(message :string, errorDetails: object | null = null) {
        super(message, StatusCodes.Unauthorized, errorDetails);
    }
};

export class InternalServerError extends APIError {
    constructor(message: string, errorDetails: object | null = null) {
        super(message, StatusCodes.ServerError, errorDetails);
    }
}

export class BadRequest extends APIError {
    constructor(message: string, errorDetails: object | null = null) {
        super(message, StatusCodes.BadRequest, errorDetails);
    }
}

export class Unprocessible extends APIError {
    constructor(message: string, errorDetails: object | null = null) {
        super(message, StatusCodes.Unprocessible, errorDetails);
    }
}


// class 

