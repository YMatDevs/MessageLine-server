import type { conversationTable } from "../schema/conversation.js";


export type Conversation = typeof conversationTable.$inferSelect;

export type ConversationType = "GROUP" | "DIRECT";


export type CreateConversationInput = {
    users: string[];
    conversation_name?: string;
    description?: string;
}


export type DeleteConversationBody = {
    conversation_ids: string[];
}

export type AddUserBody = {
    conversation_id: string;
    user_ids: string[];
}

export type RemoveUserBody = {
    conversation_id: string;
    user_ids: string[];
}

