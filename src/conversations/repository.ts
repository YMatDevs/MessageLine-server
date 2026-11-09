
import { RlsTransaction } from "../schema/config/rls-transaction.js";
import { conversationDetailsTable, conversationParticipantTable, conversationTable } from "../schema/conversation.js"
import { GetUserId } from "../utilities/context.js";
import type { Conversation, ConversationType } from "./types.js";


type ConversationList = Conversation[];

type NewConversation = {
    users: string[];
    type: ConversationType;
    conversation_name?: string; 
    description?: string;
}


export const ConversationRepository = {
    
    list: async () => RlsTransaction<ConversationList>(async (transaction) => {
            return transaction.select().from(conversationTable);
    }),

    create: async (conversation: NewConversation) => RlsTransaction<void>(async (transaction) => {

        const chat = {
            type: conversation.type,
            created_by: GetUserId()
        }

        const [ created_chat ] = await transaction.insert(conversationTable).values(chat).returning();

        const { conversation_id } = created_chat!; 

        const participants = conversation.users.map(user => ({ conversation_id: conversation_id, user_id: user}));

        await transaction.insert(conversationParticipantTable).values(participants);

        if(conversation.type === 'GROUP') {
            await transaction.insert(conversationDetailsTable).values({
                conversation_id: conversation_id,
                name: conversation.conversation_name!,
                description: conversation.description!,
            })
        }
        
    })
    
}