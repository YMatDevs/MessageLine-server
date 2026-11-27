import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new Pool({ connectionString: process.env['DATABASE_MIGRATION_URL'] });

migrate(drizzle(pool), { migrationsFolder: './drizzle' })
  .then(() => console.log('✅ Migrations applied'))
  .catch((e) => { console.error('❌ Migration failed:', e); process.exitCode = 1; })
  .finally(() => pool.end());