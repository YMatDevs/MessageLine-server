import { StatusCodes } from "../utilities/constants.js";
import { BadRequest, InternalServerError, Unauthorized } from "../utilities/error.js";
import type { ServiceResponse } from "../utilities/types.js";
import { MessageRepository } from "./repository.js";
import type { Message } from "./types.js";
import { ConversationRepository } from "../conversations/repository.js";
import { GetUserId } from "../utilities/context.js";

export async function getMessages(conversationId : string) : ServiceResponse<typeof StatusCodes.Success, Message[]>{

    const messageList = await MessageRepository.getAll(conversationId)
    .catch((err: Error) =>  { 
            console.error(err);
            throw new InternalServerError("Query Failed") 
        });

    return { 
        status: StatusCodes.Success, 
        message: "Retrieved message list",
        data: messageList 
    };
}


export async function createMessage(conversationId : string , messageData : string) : ServiceResponse<typeof StatusCodes.Success , null>{

    const conversation = await ConversationRepository.get(conversationId);
    if(!conversation) throw new BadRequest("Conversation doesn't exist");

    await MessageRepository.create({messageData , conversationId});


    return { 
        status: StatusCodes.Success, 
        message: "Message created",
        data: null 
    };
}

export async function deleteMessage(messageId : string) : ServiceResponse<typeof StatusCodes.Success , null>{

    const message = await MessageRepository.get(messageId);
    if(!message) throw new BadRequest("Message doesn't exist");
    
    if(message.sender_id !== GetUserId()) throw new Unauthorized("User not allowed to delete");

    await MessageRepository.delete(messageId);

    return {
        status : StatusCodes.Success,
        message : "Message delete" ,
        data : null
    };
}

export async function updateMessage(messageId : string , messageData : string) : ServiceResponse<typeof StatusCodes.Success , null>{

    const message = await MessageRepository.get(messageId);
    if(!message) throw new BadRequest("Message doesn't exist");
    
    if(message.sender_id !== GetUserId()) throw new Unauthorized("User not allowed to update");
    
    await MessageRepository.update(messageId , messageData);

    return {
        status : StatusCodes.Success,
        message : "Message updated" ,
        data : null
    };
}