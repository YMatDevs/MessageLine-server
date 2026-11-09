
import { pgPolicy  } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";


export const RLS_POLICY = pgPolicy('rls_policy', {
    for: 'all',
    as: 'permissive',
    to: 'current_user',
    using: sql`created_by = current_setting('app.user_id', true)::uuid`,
    withCheck: sql`created_by = current_setting('app.user_id', true)::uuid`,
});

