import { safeParse } from "valibot";
import { LoginSchema } from "./schema.js";
import type { ServiceResponse } from "../utilities/types.js";
import { Codes } from "../utilities/constants.js";
import { db } from "../db.js";
import { userTable } from '../schema/users.js'
import { eq } from "drizzle-orm";
import { verifyPassword } from "../utilities/auth.js";


async function Login(userRequest: object): Promise<ServiceResponse>  {

    const credentials = safeParse(LoginSchema, userRequest);

    if(!credentials.success) return { success: false,  status: Codes.BadRequest, message: null};

    const userCredentials = credentials.output;

    const [user] = await db.select().from(userTable).where(eq(userTable.email, userCredentials.email))

    if(!user) return { success: false,  status: Codes.Unauthorized, message: null};

    const isPasswordCorrect = verifyPassword(userCredentials.password,user.password);
    
    if(!isPasswordCorrect) return { success: false,  status: Codes.Unauthorized, message: null};

    

    return { success: true,  status: Codes.BadRequest, message: null};
}