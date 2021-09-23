-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS ab_testing_framework_db;

-- Create the db
CREATE DATABASE ab_testing_framework_db;

-- Move into the db
\c ab_testing_framework_db

-- Create our table if it doesn't already exist

DROP TYPE IF EXISTS user_types CASCADE;
CREATE TYPE user_types AS ENUM (
    'STANDARD',
    'ADMIN'
);

CREATE TABLE IF NOT EXISTS user_account
(
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email_address text NOT NULL,
  username varchar(100) NOT NULL,
  password text NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  user_type user_types NOT NULL DEFAULT 'STANDARD',
  created_at timestamp with time zone DEFAULT (now())::timestamp with time zone NOT NULL,
  last_updated_at timestamp with time zone DEFAULT (now())::timestamp with time zone NOT NULL
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE user_account
  OWNER to postgres;