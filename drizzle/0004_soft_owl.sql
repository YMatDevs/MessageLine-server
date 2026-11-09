ALTER TABLE "conversations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "conversation_participants" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "conversation_participants" DROP COLUMN "updated_at";--> statement-breakpoint
CREATE POLICY "rls_policy" ON "conversations" AS PERMISSIVE FOR ALL TO current_user USING (created_by = current_setting('app.user_id', true)::uuid) WITH CHECK (created_by = current_setting('app.user_id', true)::uuid);