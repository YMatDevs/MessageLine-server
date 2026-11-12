import { safeParse } from "valibot";
import { LoginSchema, RegisterSchema } from "./schema.js";
import { verifyPassword } from "../utilities/auth.js";
import { UserRepository } from "../users/repository.js";
import jwt from 'jsonwebtoken';
import { JWT_OPTIONS } from "../config.js";
import { BadRequest, InternalServerError, Unauthorized } from "../utilities/error.js";
import type { AuthTokenPayload, ServiceResponse } from "../utilities/types.js";
import { StatusCodes } from "../utilities/constants.js";


export async function loginService(userRequest: object): ServiceResponse<
    typeof StatusCodes.Success,
    { token: string }
> {

    const credentials = safeParse(LoginSchema, userRequest);

    if(!credentials.success) throw new BadRequest("Invalid Format");

    const userCredentials = credentials.output;

    const [user] = await UserRepository.get.byEmail(userCredentials.email);  

    if(!user) throw new Unauthorized("Invalid credentials") 
    
    const isPasswordCorrect = await verifyPassword(userCredentials.password,user.password);
    
    if(!isPasswordCorrect) throw new Unauthorized("Invalid credentials");

    const tokenPayload: AuthTokenPayload = {
        email: user.email,
        name: user.name,
        user_id: user.user_id,
    }

    const JWT_SECRET= process.env['JWT_SECRET'] as string;

    if(!JWT_SECRET) throw new InternalServerError("Something went wrong, try again later");

    const token = jwt.sign(tokenPayload, JWT_SECRET , JWT_OPTIONS);

    return {
        status: StatusCodes.Success,
        message: "login successful",
        data: { token: token }
    }
}


// export async function registerService(userRequest: object): Promise<ServiceResponseInterface<null>> {

//     const registrationData = safeParse(RegisterSchema, userRequest);

//     if(!registrationData.success) return ServiceResponse<null>({status: Codes.BadRequest});

//     const userRegistrationData = registrationData.output;

//     const [user] = await UserRepository.get.byEmail(userRegistrationData.email);
    
//     if(user) return ServiceResponse<null>({status: Codes.Conflict});

    


//     return ServiceResponse<null>({status: Codes.Success , success: true});
    
// }