import type { conversationTable } from "../schema/conversation.js";


export type Conversation = typeof conversationTable.$inferSelect;

export type ConversationType = "GROUP" | "DIRECT";


export type CreateConversationInput = {
    users: string[];
    conversation_name?: string;
    description?: string;
}