import { Router } from "express";
import type { APIResponseInterface } from "../utilities/types.js";
import type { Request, Response } from "express";
import { createConversations, listService } from "./service.js";


const router = Router();


router.get('/',  async (req: Request, res: Response): Promise<Response<APIResponseInterface<null>>> => {

    const { success, data, status, message } = await listService();

    return res.status(status).json({ success, message, data });
});

router.post('/', async (req: Request, res: Response): Promise<Response<APIResponseInterface<null>>> => {

    const { users, conversation_name, description } = req.body;

    const { status, message } = await createConversations({ users, conversation_name, description });

    return res.status(status).json({ message });
    
});

export default router;
