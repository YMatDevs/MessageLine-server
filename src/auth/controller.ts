
import { Router } from 'express';
import type { Request, Response } from 'express';

import { loginService } from './service.js';


import { AUTH_COOKIE_NAME, COOKIE_OPTIONS } from '../config.js';
import type { APIResponseInterface } from '../utilities/types.js';
import { Codes } from '../utilities/constants.js';



const router = Router();

// Login
router.post('/login', async (req: Request, res: Response): Promise<Response<APIResponseInterface<null>>> => {
    
    const { email, password } = req.body;


    const {status, message, success, data } = await loginService({ email, password })
    .catch(() => ({ status: Codes.ServerError, success: false, message: "An error has occured", data: null }));

    if(success) {
        res.cookie(AUTH_COOKIE_NAME, data!.token, COOKIE_OPTIONS);
    }

    return res.status(status).json({ success, message });
})
// Logout

// Refresh access token


// register

// resend otp

// verify mail

// forget password

// change password

export default router;