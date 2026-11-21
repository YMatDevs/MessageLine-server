-- Custom SQL migration file, put your code below! --



CREATE OR REPLACE FUNCTION get_conversations()
RETURNS uuid[]
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT ARRAY(
    SELECT conversation_id
    FROM conversation_participants
    WHERE user_id = current_setting('app.user_id', true)::uuid
  );
$$;