

import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
    user_id: string;
}


export const requestContext = new AsyncLocalStorage<RequestContext>();



/**
 * HELPERS ---------------------
 */

export function GetUserId() : string {
    const store = requestContext.getStore();
    if(store?.user_id) return store.user_id;
    else throw Error("Unauthorized: missing user_id in Context");
}
