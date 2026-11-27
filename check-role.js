import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_MIGRATION_URL,
});

try {
  const result = await pool.query(`
    SELECT rolname, rolcanlogin
    FROM pg_roles
    WHERE rolname = 'app_user'
  `);

  console.table(result.rows);
} catch (error) {
  console.error("DATABASE ERROR:", error);
} finally {
  await pool.end();
}