import { safeParse } from "valibot";
import { LoginSchema } from "./schema.js";
import type { ServiceResponseInterface } from "../utilities/types.js";
import { Codes } from "../utilities/constants.js";
import { verifyPassword } from "../utilities/auth.js";
import { get } from "../users/repository.js";
import jwt from 'jsonwebtoken';
import { ServiceResponse } from "../utilities/service.js";


type LoginType = { token: string };

async function Login(userRequest: object): Promise<ServiceResponseInterface<LoginType>>  {

    const credentials = safeParse(LoginSchema, userRequest);

    if(!credentials.success) return ServiceResponse<LoginType>({ status: Codes.BadRequest }) 

    const userCredentials = credentials.output;

    const [user] = await get.byEmail(userCredentials.email);

    if(!user) return ServiceResponse<LoginType>({ status: Codes.Unauthorized });
    
    const isPasswordCorrect = await verifyPassword(userCredentials.password,user.password);
    
    if(!isPasswordCorrect) return ServiceResponse<LoginType>({ status: Codes.Unauthorized });

    const tokenPayload = {
        email: user.email,
        name: user.name,
    }

    const JWT_SECRET= process.env['JWT_SECRET'] as string;

    if(!JWT_SECRET) return ServiceResponse<LoginType>({ status: Codes.ServerError });

    const token = jwt.sign(tokenPayload, JWT_SECRET ,  { expiresIn: '1h' });

    return { success: true,  status: Codes.BadRequest, message: null, data: { token: token }};

}