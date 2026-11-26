

-- PARTICIPANTS TABLE
-- -------------------------------
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;

-- ALL
CREATE POLICY rls_participants
ON conversation_participants
FOR ALL
TO app_user
USING (
    conversation_participants.conversation_id = ANY(get_conversations())
);

-- CREATE
CREATE POLICY rls_participants_create
ON conversation_participants
FOR INSERT
TO app_user
WITH CHECK (
    TRUE
);



-- CONVERSATIONS TABLE
-- -------------------------------
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- SELECT
CREATE POLICY rls_conversation_read
ON conversations
FOR SELECT
TO app_user
USING (
    conversations.conversation_id = ANY(get_conversations())
);
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

-- DELETE
CREATE POLICY rls_conversation_delete
ON conversations
FOR DELETE
TO app_user
USING (
    conversations.conversation_id = ANY(get_conversations())
);

-- CREATE
CREATE POLICY rls_conversation_create
ON conversations
FOR INSERT
TO app_user
WITH CHECK (
    TRUE
);
