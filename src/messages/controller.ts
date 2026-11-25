import { Router } from "express";
import type { Request, Response } from "express";

import authBoundary from "../middlewre/authBoundary.js";
import type { APIResponse } from "../utilities/types.js";
import type { Message } from "./types.js";
import { StatusCodes } from "../utilities/constants.js";
import { createMessage, deleteMessage, getMessages, updateMessage } from "./service.js";

const router = Router();

router.get('/' , authBoundary , async( req : Request , res : Response) : APIResponse<Message[]> => {


    const {conversationId} = req.body;

    const { data , message  } = await getMessages(conversationId);

    return res.status(StatusCodes.Success).json({ success: true, message, data });
    
});


router.post('/' , authBoundary , async( req : Request , res : Response) : APIResponse<null> =>{

    const { conversationId , messageData } = req.body;
    
    const { message } = await createMessage(conversationId , messageData);

    return res.status(StatusCodes.Success).json({ success: true, message });

    
})


router.delete('/' , authBoundary , async ( req : Request , res : Response) : APIResponse<null> =>{

    const { messageId } = req.body;

    const { message } = await deleteMessage(messageId);
 
    return res.status(StatusCodes.Success).json({ success: true , message});
})


router.patch('/' , authBoundary , async ( req : Request , res : Response ) : APIResponse<null> =>{


    const {message_id , messageData } = req.body;

    const { message } = await updateMessage(message_id , messageData) ;

    

    return res.status(StatusCodes.Success).json({success : true , message });
})

export default router;
