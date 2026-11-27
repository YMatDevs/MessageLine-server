import {pgTable, uuid, timestamp ,varchar, index } from "drizzle-orm/pg-core";
import { userTable } from "./users.js";
import { conversationTable } from "./conversation.js";


export const messageTable = pgTable("messages" , {
    message_id: uuid("message_id").defaultRandom().primaryKey(),

    message: varchar("message").notNull(),
    
    conversation_id: uuid("conversation_id").notNull().references(() => conversationTable.conversation_id  , { onDelete: "cascade" }),

    sender_id: uuid("sender_id").notNull().references(() => userTable.user_id),

    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
    index("messages_conversation_created_idx").on(table.conversation_id, table.created_at),
]);