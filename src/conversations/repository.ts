
import { db } from "../db.js"
import { conversationTable } from "../schema/conversation.js"

export const ConversationRepository = {
    list: async  () => {
        return db.select().from(conversationTable);
    }
}