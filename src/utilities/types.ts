import type { StatusCodes } from "./constants.js";
import type { Response } from "express";

export type StatusCode = typeof StatusCodes[keyof typeof StatusCodes];


export type ServiceResponse<C extends StatusCode = StatusCode, T = null> = Promise<{
    status: C;
    message: string | null;
    data: T;
}>;



export type APISucessResponse<T> = {
    success: true;
    message: string | null;
    data: T | null;
};
export type APIFailureResponse = {
    success: false;
    message: string | null;
    errorDetails: object | null;
};

export type APIResponse<T> = Promise<Response<APISucessResponse<T>>>;




export type AuthTokenPayload = {
    user_id: string;
    email: string;
    name: string;
}

