import type { ErrorRequestHandler } from "express";
import { Codes } from "../utilities/constants.js";


export const errorBoundary: ErrorRequestHandler = (error, req, res, next) => {


    const message = error.message;
    const stackTrace = error.stack;

    const format = `
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    🚨 ERROR
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Message: ${message}

    Method:  ${req.method}
    URL:     ${req.originalUrl}

    Stack Trace:
    ${stackTrace}
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;

    console.error(format);


    res.status(Codes.ServerError).json({ success: false, message: "An error has occured" });
}