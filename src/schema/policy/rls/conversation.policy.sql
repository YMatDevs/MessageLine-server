

-- PARTICIPANTS TABLE
-- -------------------------------
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint

-- READ
CREATE POLICY rls_participants_read
ON conversation_participants
TO app_user
FOR SELECT
USING (
    conversation_participants.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- UPDATE
CREATE POLICY rls_participants_update
ON conversation_participants
TO app_user
FOR UPDATE
USING (
    conversation_participants.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- DELETE
CREATE POLICY rls_participants_delete
ON conversation_participants
TO app_user
FOR DELETE
USING (
    conversation_participants.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- CONVERSATIONS TABLE
-- -------------------------------
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint

-- READ
CREATE POLICY rls_conversation_read
ON conversations
TO app_user
FOR SELECT
USING (
    conversations.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- CREATE
CREATE POLICY rls_conversation_create
ON conversations
TO app_user
FOR INSERT
WITH CHECK (
    conversations.created_by = current_setting('app.user_id', true)::uuid
);
--> statement-breakpoint

-- UPDATE
CREATE POLICY rls_conversation_update
ON conversations
TO app_user
FOR UPDATE
USING (
    conversations.conversation_id = ANY(get_conversations())
)
WITH CHECK (
    conversations.created_by = current_setting('app.user_id', true)::uuid
);
--> statement-breakpoint

-- DELETE
CREATE POLICY rls_conversation_delete
ON conversations
TO app_user
FOR DELETE
USING (
    conversations.conversation_id = ANY(get_conversations())
);