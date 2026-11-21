-- Schema access
GRANT USAGE ON SCHEMA public TO app_user;

-- Existing tables
GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO app_user;

-- Existing sequences
GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO app_user;

-- Future tables
ALTER DEFAULT PRIVILEGES
FOR ROLE neondb_owner
IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLES TO app_user;

-- Future sequences
ALTER DEFAULT PRIVILEGES
FOR ROLE neondb_owner
IN SCHEMA public
GRANT USAGE, SELECT
ON SEQUENCES TO app_user;

-- Existing functions (including RLS helper functions)
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_user;