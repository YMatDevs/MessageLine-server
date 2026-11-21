import { safeParse } from "valibot";
import { UserRepository } from "../users/repository.js";
import type { ServiceResponse } from "../utilities/types.js";
import { ConversationRepository } from "./repository.js";
import type { Conversation, CreateConversationInput } from "./types.js";
import { NewConversationSchema } from "./schema.js";
import { BadRequest, InternalServerError, Unprocessible } from "../utilities/error.js";
import { StatusCodes } from "../utilities/constants.js";
import { GetUserId } from "../utilities/context.js";

export async function listService(): ServiceResponse<
    typeof StatusCodes.Success, 
    Conversation[]
> {

    const converstionList = await ConversationRepository.list()
    .catch((err: Error) =>  { 
        console.error(err);
        throw new InternalServerError("Query Failed") 
    });

    return { 
        status: StatusCodes.Success, 
        message: "Retrieved conversation list",
        data: converstionList 
    };
}




export async function createConversations( new_conversation_input : CreateConversationInput): ServiceResponse<
    typeof StatusCodes.Created,
    null
> {
    // Parse request body
    const new_conversation = (() => {
        const { output, success } = safeParse(NewConversationSchema, new_conversation_input);
        if(!success) return null;
        return output;
    })();

    // If parsing fails then return bad req
    if(null === new_conversation) throw new BadRequest("Invalid Format");


    // Check if users exist or not
    {
        const valid_users = (await UserRepository.get.byUserIds(new_conversation.users)).map(user => user.user_id);

        if(valid_users.length !== new_conversation.users.length) throw new Unprocessible("Some of the users are not processible");

    }

    const new_convo = {
        ...new_conversation,
        users: [ ...new_conversation.users, GetUserId()]
    }
  
    await ConversationRepository.create(new_convo);

    return {
        status: StatusCodes.Created,
        message: "Conversation created successfully",
        data: null,
    }
}

















