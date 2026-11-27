import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const url = process.env['DATABASE_MIGRATION_URL'];
if (!url) throw new Error("DATABASE_MIGRATION_URL not set");
export default defineConfig({
  out: './drizzle',
  schema: './src/schema/index.ts',
  dialect: 'postgresql',
  verbose: true,
  strict: true,
  dbCredentials: {
    url,
  },
  entities: {
    roles: {
      provider: 'neon',
      exclude: ['neondb_owner'],
    }
  }
});
