import { message, safeParse } from "valibot";
import { UserRepository } from "../users/repository.js";
import type { ServiceResponse, StatusCode } from "../utilities/types.js";
import { ConversationRepository } from "./repository.js";
import type { AddUserBody, Conversation, CreateConversationInput, DeleteConversationBody, RemoveUserBody } from "./types.js";
import Schema from "./schema.js";
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
        const { output, success } = safeParse(Schema.conversation.add, new_conversation_input);
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


export async function deleteConversations( requestBody: DeleteConversationBody ): ServiceResponse<
    typeof StatusCodes.NoContent | typeof StatusCodes.MultiStatus,
    null
> {
    const { output: conversation_ids, success } = safeParse(Schema.conversation.delete, requestBody);
    
    if(!success) throw new BadRequest("Invalid Format");


    const results = await Promise.allSettled(
        conversation_ids.map(conversation_ids => ConversationRepository.delete(conversation_ids))
    );

    if(results.some(deleteJob => deleteJob.status === 'rejected')) return {
        status: StatusCodes.MultiStatus,
        message: "Failed to delete some of the conversations",
        data: null
    };

    return {
        status: StatusCodes.NoContent,
        message: "Successfully deleted conversations",
        data: null
    };

}


export async function addUsers(requestBody: AddUserBody): ServiceResponse<
    typeof StatusCodes.Created,
    null
> {

    const { success, output: data } = safeParse(Schema.participant.add, requestBody);

    if(!success) throw new BadRequest("Invalid format");

    await ConversationRepository.addParticipants(data.conversation_id, data.user_ids);

    return {
        status: StatusCodes.Created,
        message: "Successfully added new users",
        data: null
    }

}


export async function removeUsers(requestBody: RemoveUserBody): ServiceResponse<
    typeof StatusCodes.NoContent,
    null
> {
    const { success, output: data } = safeParse(Schema.participant.delete, requestBody);

    if(!success) throw new BadRequest("Invalid format");

    await ConversationRepository.removeParticipants(data.conversation_id, data.user_ids);

    return {
        status: StatusCodes.NoContent,
        message: "Successfully removed users",
        data: null
    }
}