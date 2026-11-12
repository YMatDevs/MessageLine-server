
import { Router } from 'express';
import type { Request, Response } from 'express';

import { loginService } from './service.js';


import { AUTH_COOKIE_NAME, COOKIE_OPTIONS } from '../config.js';
import type { APIResponse } from '../utilities/types.js';
import { StatusCodes } from '../utilities/constants.js';



const router = Router();

// Login
router.post('/login', async (req: Request, res: Response): APIResponse<
    null
> => {
    
    const { email, password } = req.body;


    const { message, data } = await loginService({ email, password })

    res.cookie(AUTH_COOKIE_NAME, data!.token, COOKIE_OPTIONS);

    return res.status(StatusCodes.Success).json({ success: true, message });
})
// Logout

// Refresh access token


// register

// resend otp

// verify mail

// forget password

// change password

export default router;