import { ServiceResponse } from "../utilities/service.js";
import type { ServiceResponseInterface } from "../utilities/types.js";
import { ConversationRepository } from "./repository.js";
import type { Conversation } from "./types.js";

export async function listService(): Promise<ServiceResponseInterface<Conversation[]>> {

    const converstionList = await ConversationRepository.list();

    return ServiceResponse<Conversation[]>({ status: 200, success: true, data: converstionList });
}