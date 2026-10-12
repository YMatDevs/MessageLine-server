import type { CookieOptions } from "express";

export const SALT_ROUNDS = 10;

export const AUTH_COOKIE_NAME = "sessionToken";


export const COOKIE_OPTIONS : CookieOptions = {
    httpOnly: true,
    secure: process.env['NODE_ENV'] === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    
};