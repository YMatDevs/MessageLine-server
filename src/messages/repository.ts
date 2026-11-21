import { messageTable } from "../schema/message.js";
import { RlsTransaction } from "../schema/config/rls-transaction.js";
import type { Message } from "./types.js";
import { eq } from "drizzle-orm";
import { GetUserId } from "../utilities/context.js";

type MessageList = Message[];

type NewMessage = {
    conversationId : string,
    messageData : string
}

export const MessageRepository = {
    
    get: async (conversationId : string) => RlsTransaction<MessageList>(async (transaction) => {
        return transaction.select().from(messageTable).where(eq(messageTable.conversation_id ,conversationId));
    }),

    create: async (message: NewMessage) => RlsTransaction<void>(async (transaction) => {

        const messageType = {
            message : message.messageData ,
            conversation_id : message.conversationId,
            sender_id : GetUserId()
        }

        await transaction.insert(messageTable).values(messageType).returning();
        
        
    })
    
}
