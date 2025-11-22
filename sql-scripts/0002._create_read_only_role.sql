CREATE ROLE readonly PASSWORD '<password>';

-- Grant permission to connect to the database
GRANT CONNECT ON DATABASE "horizon-empire" TO readonly;

-- Grant USAGE on the schema
GRANT USAGE ON SCHEMA public TO readonly;

-- Grant SELECT on all existing tables in the schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Grant SELECT on all tables added in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly;
