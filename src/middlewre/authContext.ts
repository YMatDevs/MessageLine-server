import type { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utilities/error.js";
import { requestContext, type RequestContext } from "../utilities/context.js";

export default function authContext(req :Request, res: Response, next: NextFunction) {


    const context = res.locals['context'];

    if(!context) throw new Unauthorized("User is not logged in");

    const store: RequestContext = context;

    requestContext.run( store, () => { 
        next();
    })

}