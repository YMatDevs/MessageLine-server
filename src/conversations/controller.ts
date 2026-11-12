import { Router } from "express";
import type { APIResponse } from "../utilities/types.js";
import type { Request, Response } from "express";
import { createConversations, listService } from "./service.js";
import authBoundary from "../middlewre/authBoundary.js";
import type { Conversation } from "./types.js";
import { StatusCodes } from "../utilities/constants.js";


const router = Router();


router.get('/', authBoundary,  async (req: Request, res: Response): APIResponse<
    Conversation[]
> => {

    const { data, message } = await listService();

    return res.status(StatusCodes.Success).json({ success: true, message, data });
});




router.post('/', authBoundary,  async (req: Request, res: Response): APIResponse<
    null
> => {

    const { users, conversation_name, description } = req.body;

    const { message } = await createConversations({ users, conversation_name, description });

    return res.status(StatusCodes.Created).json({ success: true, message });
    
});

export default router;
