import type { Request, Response, NextFunction } from "express";
import { AUTH_COOKIE_NAME } from "../config.js";
import jwt from "jsonwebtoken";
import { InternalServerError, Unauthorized } from "../utilities/error.js";
import { requestContext, type RequestContext } from "../utilities/context.js";


export default function authBoundary(req :Request, res: Response, next: NextFunction) {

    const auth_cookie = req.cookies[AUTH_COOKIE_NAME];

    if(!auth_cookie || auth_cookie === undefined) throw new Unauthorized("No cookie is present");

    const secret = process.env['JWT_SECRET'];
    if(!secret) throw new InternalServerError("No secret set in environment");

    const auth_payload = jwt.verify(auth_cookie, secret);

    if(auth_payload === "string") throw new Unauthorized("Token not present in cookie");

    const store: RequestContext = {
        user_id: (auth_payload as RequestContext).user_id,
        name: (auth_payload as RequestContext).name,
        email: (auth_payload as RequestContext).email
    }

    requestContext.run(store, () => {
        next();
    })
}