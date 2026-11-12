import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from './schema/index.js';

const db_connection: string | undefined = process.env['DATABASE_URL'];

if(!db_connection) throw new Error("Database connection string not defined");

const pool = new Pool({ connectionString: db_connection });

export const db = drizzle({ client: pool, schema });


export * from './schema/index.js';