import { safeParse } from "valibot";
import { UserRepository } from "../users/repository.js";
import { Codes } from "../utilities/constants.js";
import { ServiceResponse } from "../utilities/service.js";
import type { ServiceResponseInterface } from "../utilities/types.js";
import { ConversationRepository } from "./repository.js";
import type { Conversation, ConversationType, CreateConversationInput } from "./types.js";
import { NewConversationSchema } from "./schema.js";

export async function listService(): Promise<ServiceResponseInterface<Conversation[]>> {


    const converstionList = await ConversationRepository.list();

    return ServiceResponse<Conversation[]>({ status: Codes.Success, success: true, data: converstionList });
}




export async function createConversations( new_conversation_input : CreateConversationInput): Promise<ServiceResponseInterface<null>> {

    // Parse request body
    const new_conversation = (() => {
        const { output, success } = safeParse(NewConversationSchema, new_conversation_input);
        if(!success) return null;
        return output;
    })();

    console.log("PARTIAL11");

    // If parsing fails then return bad req
    if(null === new_conversation) return ServiceResponse<null>({
        status: Codes.BadRequest,
        message: "Invalid format",
    });

    console.log("PARTIAL");


    // Parse Valid User List
    {
        const valid_users = new Set((await UserRepository.get.byUserIds(new_conversation.users)).map(user => user.user_id));
        
        const { success } = safeParse(NewConversationSchema, {
            ...new_conversation,
            users: [ ...valid_users],
        });

        const allUsersAreValid = valid_users.size === new_conversation.users.length;

        if(!(success && allUsersAreValid)) return ServiceResponse<null>({
            status: Codes.Unprocessible,
            message: "Some of the users are not valid",
        });

    }
  
    await ConversationRepository.create(new_conversation);

    return ServiceResponse<null>({ status: Codes.Created, success: true, data: null })
}


















