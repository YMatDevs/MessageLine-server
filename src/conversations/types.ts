import type { conversationTable } from "../schema/conversation.js";


export type Conversation = typeof conversationTable.$inferSelect;