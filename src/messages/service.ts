import { StatusCodes } from "../utilities/constants.js";
import { BadRequest, InternalServerError, Unprocessible } from "../utilities/error.js";
import type { ServiceResponse } from "../utilities/types.js";
import { MessageRepository } from "./repository.js";
import type { Message } from "./types.js";
import { ConversationRepository } from "../conversations/repository.js";

export async function getMessages(conversationId : string) : ServiceResponse<typeof StatusCodes.Success, Message[]>{

    const messageList = await MessageRepository.get(conversationId)
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