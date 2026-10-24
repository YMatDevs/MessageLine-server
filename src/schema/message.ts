import {pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { userTable } from "./users.js";
import { conversationTable } from "./conversation.js";


export const messageTable = pgTable("messages" , {
    message_id: uuid("message_id").defaultRandom().primaryKey(),
    
    conversation_id: uuid("conversation_id").notNull().references(() => conversationTable.conversation_id),

    sender_id: uuid("sender_id").notNull().references(() => userTable.user_id),

    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
});