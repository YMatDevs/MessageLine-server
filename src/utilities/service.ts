import type { ServiceResponseInterface } from "./types.js";

type ServiceProps<T> = Partial<ServiceResponseInterface<T>>

export function ServiceResponse<T>({success = false, status= 500, message = "", data = null} : ServiceProps<T>) : ServiceResponseInterface<T> {
    return { success, status, message, data};
}