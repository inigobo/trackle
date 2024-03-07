
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
        begin
            insert into public.profile (id, username, fullname, avatar_seed)
            values (new.id, new.raw_user_meta_data->> 'username', new.raw_user_meta_data ->> 'fullname', new.raw_user_meta_data->> 'avatar_seed');
            return new;
        end;
        $$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_user_delete"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
        begin
          delete from auth.users where id = old.id;
          return old;
        end;
        $$;

ALTER FUNCTION "public"."handle_user_delete"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."ProfilesOnGroups" (
    "group_id" "uuid" NOT NULL,
    "profile_id" "uuid" NOT NULL
);

ALTER TABLE "public"."ProfilesOnGroups" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."game" (
    "id" integer NOT NULL,
    "solution" "text" NOT NULL
);

ALTER TABLE "public"."game" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group" (
    "id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "avatar_seed" "text" NOT NULL
);

ALTER TABLE "public"."group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."play" (
    "attempts" "text" NOT NULL,
    "game_id" integer NOT NULL,
    "profile_id" "uuid" NOT NULL
);

ALTER TABLE "public"."play" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" "uuid" NOT NULL,
    "username" "text" NOT NULL,
    "avatar_seed" "text" NOT NULL,
    "fullname" "text" NOT NULL
);

ALTER TABLE "public"."profile" OWNER TO "postgres";

ALTER TABLE ONLY "public"."ProfilesOnGroups"
    ADD CONSTRAINT "ProfilesOnGroups_pkey" PRIMARY KEY ("group_id", "profile_id");

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."game"
    ADD CONSTRAINT "game_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group"
    ADD CONSTRAINT "group_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."play"
    ADD CONSTRAINT "play_pkey" PRIMARY KEY ("game_id", "profile_id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "group_name_key" ON "public"."group" USING "btree" ("name");

CREATE UNIQUE INDEX "profile_username_key" ON "public"."profile" USING "btree" ("username");

CREATE OR REPLACE TRIGGER "on_profile_user_deleted" AFTER DELETE ON "public"."profile" FOR EACH ROW EXECUTE FUNCTION "public"."handle_user_delete"();

ALTER TABLE ONLY "public"."ProfilesOnGroups"
    ADD CONSTRAINT "ProfilesOnGroups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."ProfilesOnGroups"
    ADD CONSTRAINT "ProfilesOnGroups_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."play"
    ADD CONSTRAINT "play_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."play"
    ADD CONSTRAINT "play_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON UPDATE CASCADE ON DELETE CASCADE;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;

RESET ALL;
