import {pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";


export const userTable = pgTable("users", {
    user_id: uuid("user_id").defaultRandom().primaryKey(),

    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),

    name: varchar("name", { length: 256 }).notNull(),

    created_at: timestamp("created_at").notNull(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
});





