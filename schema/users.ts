import {pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";


export const userTable = pgTable("users", {
    user_id: uuid("user_id").defaultRandom().primaryKey(),

    email: varchar("email", { length: 256 }).unique(),
    password: varchar("password", { length: 256 }),
});


export const userInfoTable = pgTable("users_info", {
    user_id: uuid("user_id").primaryKey().references(() =>  userTable.user_id, { onDelete: "cascade" }),

    name: varchar("name", { length: 256 }).notNull(),

    created_at: timestamp("created_at"),
    updated_at: timestamp("updated_at").notNull().defaultNow()
    
})


