
import { eq, inArray, and } from "drizzle-orm";
import { RlsTransaction } from "../schema/config/rls-transaction.js";
import { conversationDetailsTable, conversationParticipantTable, conversationTable } from "../schema/conversation.js"
import { GetUserId } from "../utilities/context.js";
import type { Conversation, ConversationType } from "./types.js";
import { DBError } from "../utilities/error.js";


type ConversationList = Conversation[];

type NewConversation = {
    users: string[];
    type: ConversationType;
    conversation_name?: string; 
    description?: string;
}


export const ConversationRepository = {

    get: async(conversationId : string) => RlsTransaction<Conversation | null >(async (transaction) => {
        const [ conversation ] = await transaction.select().from(conversationTable).where(eq(conversationTable.conversation_id , conversationId));
        if(conversation) return conversation;
        return null;
    }),
    
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
        
    }),
    
    delete: async (conversation_id: string) => RlsTransaction<Conversation>(async (transaction) => {
        const [ conversation ] = await transaction.delete(conversationTable).where(eq(conversationTable.conversation_id, conversation_id)).returning();
        if(!conversation) throw new DBError("Conversation does not exist");
        return conversation;
    }),


    addParticipants: async (conversation_id: string, user_ids: string[]) => RlsTransaction<void>(async (transaction) => {

        const rows = user_ids.map(user_id => ({ user_id: user_id, conversation_id: conversation_id }));

        await transaction.insert(conversationParticipantTable).values(rows);
    }),

    removeParticipants: async (conversation_id: string, user_ids: string[]) => RlsTransaction<void>(async (transaction) => {

        await transaction.delete(conversationParticipantTable).where(
            and(
                inArray(conversationParticipantTable.user_id, user_ids),
                eq(conversationParticipantTable.conversation_id, conversation_id)
            )
        );
    })
}