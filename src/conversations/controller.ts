import { Router } from "express";
import type { APIResponse } from "../utilities/types.js";
import type { Request, Response } from "express";
import { addUsers, createConversations, deleteConversations, listService, removeUsers } from "./service.js";
import authBoundary from "../middlewre/authBoundary.js";
import type { Conversation } from "./types.js";
import { StatusCodes } from "../utilities/constants.js";


const router = Router();


router.get('/', authBoundary,  async (_req: Request, res: Response): APIResponse<
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


router.delete('/', authBoundary, async (req: Request, res: Response): APIResponse<
    null
> => {
    
    const { message } = await deleteConversations(req.body);  

    return res.status(StatusCodes.NoContent).json({ success: true, message: message  });

});


router.post('/participants', authBoundary, async (req: Request, res: Response): APIResponse<
    null
> => {
    
    const { message } = await addUsers(req.body);

    return res.status(StatusCodes.Created).json({ success: true, message });

});

router.delete('/participants', authBoundary, async (req: Request, res: Response): APIResponse<
    null
> => {

    const { message } = await removeUsers(req.body);

    return res.status(StatusCodes.NoContent).json({ success: true, message });

})

export default router;
