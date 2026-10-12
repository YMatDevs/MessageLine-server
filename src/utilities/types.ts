export interface ServiceResponseInterface<T> {
    success: boolean;
    status: number;
    message: string | null ;
    data: T | null
}



export interface APIResponseInterface<T> {
    success: boolean;
    data: T | null;
    error?: {
        code: string;
        displayMessage: string;
        details: Record<string, any> | null;
    }
}

