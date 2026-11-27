ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
CREATE POLICY rls_message_read ON messages
FOR SELECT TO app_user
USING (conversation_id = ANY(get_conversations()));
--> statement-breakpoint
CREATE POLICY rls_message_create ON messages
FOR INSERT TO app_user
WITH CHECK (
    sender_id = current_setting('app.user_id', true)::uuid
    AND conversation_id = ANY(get_conversations())
);
--> statement-breakpoint
CREATE POLICY rls_message_update ON messages
FOR UPDATE TO app_user
USING (sender_id = current_setting('app.user_id', true)::uuid)
WITH CHECK (
    sender_id = current_setting('app.user_id', true)::uuid
    AND conversation_id = ANY(get_conversations())
);
--> statement-breakpoint
CREATE POLICY rls_message_delete ON messages
FOR DELETE TO app_user
USING (sender_id = current_setting('app.user_id', true)::uuid);
--> statement-breakpoint