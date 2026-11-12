import type { ErrorRequestHandler } from "express";

import { APIError, InternalServerError } from "../utilities/error.js";


export const errorBoundary: ErrorRequestHandler = (error, req, res, next) => {

    console.error("Error Boundary triggered");
    console.error(error);

    if(error instanceof APIError) return error.sendResponse(res);

    const internalServerError = new InternalServerError("Something went wrong, please try again later");

    

    return internalServerError.sendResponse(res);

}