


-- MESSAGE TABLE
-- -------------------------------
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- SELECT
CREATE POLICY rls_message_read
ON messages
FOR SELECT
TO app_user
USING (
    messages.conversation_id = ANY(get_conversations())
);

-- UPDATE
CREATE POLICY rls_message_update
ON messages
FOR UPDATE
TO app_user
USING (
    messages.conversation_id = ANY(get_conversations())
)
WITH CHECK (
    conversation_id = ANY(get_conversations())
);

-- DELETE
CREATE POLICY rls_message_delete
ON messages
FOR DELETE
TO app_user
USING (
    messages.conversation_id = ANY(get_conversations())
);

-- CREATE
CREATE POLICY rls_message_create
ON messages
FOR INSERT
TO app_user
WITH CHECK (
    messages.sender_id = current_setting('app.user_id', true)::uuid
);
