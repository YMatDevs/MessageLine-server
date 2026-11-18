ALTER TABLE "conversations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY "rls_policy" ON "conversations" CASCADE;