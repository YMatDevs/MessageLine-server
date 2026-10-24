import {pgTable, uuid, varchar, timestamp, smallint } from "drizzle-orm/pg-core";


export const userTable = pgTable("users", {
    user_id: uuid("user_id").defaultRandom().primaryKey(),

    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),

    name: varchar("name", { length: 256 }).notNull(),

    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
});

export const pendingRegistrationTable = pgTable("pending_registrations", {
    pending_registration_id: uuid("pending_registration_id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 256 }).notNull(),

    email: varchar("email", { length: 256 }).unique().notNull(),
    password: varchar("password", { length: 256 }).notNull(),

    otp: varchar("otp", { length: 256 }).notNull(),
    otp_expires_at: timestamp("otp_expires_at").notNull(),
    otp_attempts: smallint("otp_attempts").default(0).notNull(),

    registration_expires_at: timestamp("otp_expires_at").notNull(),

    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow()
});



