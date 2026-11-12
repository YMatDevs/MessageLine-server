export const StatusCodes = {

    // Client Errors
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    Conflict: 409,
    Unprocessible: 422,

    // Server Errors
    ServerError: 500,


    // Successes
    Success: 200,
    Created: 201,
} as const;
