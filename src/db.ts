import { drizzle } from "drizzle-orm/neon-http";

const db_connection: string | undefined = process.env['DATABASE_URL'];

if(!db_connection) throw new Error("Database connection string not defined");

export const db = drizzle(db_connection);


export * from '../schema/index.js';