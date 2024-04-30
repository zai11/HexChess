CREATE DATABASE hexchess
    WITH
    OWNER = postgres
    TEMPLATE = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_AU.UTF-8'
    LC_CTYPE = 'en_AU.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT ALL ON DATABASE hexchess TO postgres;