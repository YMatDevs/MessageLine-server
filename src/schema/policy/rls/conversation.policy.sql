

-- PARTICIPANTS TABLE
-- -------------------------------
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint

-- ALL
CREATE POLICY rls_participants
ON conversation_participants
FOR ALL
TO app_user
USING (
    conversation_participants.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- CREATE
CREATE POLICY rls_participants_create ON conversation_participants
FOR INSERT TO app_user
WITH CHECK (
    conversation_id = ANY(get_conversations())
    OR conversation_id IN (
        SELECT conversation_id FROM conversations
        WHERE created_by = current_setting('app.user_id', true)::uuid
    )
);
--> statement-breakpoint


-- CONVERSATIONS TABLE
-- -------------------------------
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
--> statement-breakpoint

-- SELECT
CREATE POLICY rls_conversation_read ON conversations
FOR SELECT TO app_user
USING (
    conversation_id = ANY(get_conversations())
    OR created_by = current_setting('app.user_id', true)::uuid
);
--> statement-breakpoint

-- UPDATE
CREATE POLICY rls_conversation_update
ON conversations
FOR UPDATE
TO app_user
USING (
    conversations.conversation_id = ANY(get_conversations())
)
WITH CHECK (
    conversations.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- DELETE
CREATE POLICY rls_conversation_delete
ON conversations
FOR DELETE
TO app_user
USING (
    conversations.conversation_id = ANY(get_conversations())
);
--> statement-breakpoint

-- CREATE
CREATE POLICY rls_conversation_create ON conversations
FOR INSERT TO app_user
WITH CHECK (created_by = current_setting('app.user_id', true)::uuid);
--> statement-breakpoint