import {pgTable, uuid, varchar, timestamp, pgEnum, primaryKey } from "drizzle-orm/pg-core";
import { userTable } from "./users.js";

export const conversationDetails = pgTable("groups" , {
    conversation_id: uuid("conversation_id").primaryKey(),

    
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("description", { length: 256 }).notNull(),

});

export const conversationTypeEnum = pgEnum("conversation_type", [
    "DIRECT",
    "GROUP"
]);

export const conversationTable = pgTable("conversations" , {
    conversation_id: uuid("conversation_id").defaultRandom().primaryKey(),
    
    type: conversationTypeEnum("type").notNull(),

    created_by: uuid("created_by").notNull().references(() => userTable.user_id),

    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
});

export const conversationParticipantTable = pgTable("conversation_participants" , {
    conversation_id: uuid("conversation_id").notNull().references(() => conversationTable.conversation_id),

    user_id: uuid("user_id").notNull().references(() => userTable.user_id),

    joined_at: timestamp("joined_at").notNull().defaultNow(),


    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
},
(table) => [
    primaryKey({
        columns : [table.conversation_id, table.user_id, table.joined_at]
    }),
]
);