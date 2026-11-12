

import { AsyncLocalStorage } from "node:async_hooks";
import { InternalServerError } from "./error.js";

export interface RequestContext {
    user_id: string;
    name: string;
    email: string;
}


export const requestContext = new AsyncLocalStorage<RequestContext>({});



/**
 * HELPERS ---------------------    
 */

export function GetUserId() : string {
    const store = requestContext.getStore();
    if(store?.user_id) return store.user_id;
    else throw new InternalServerError("user_id is missing in transaction context");
}
