create table "public"."ProfilesOnGroups" (
    "group_id" uuid not null,
    "profile_id" uuid not null
);


create table "public"."_prisma_migrations" (
    "id" character varying(36) not null,
    "checksum" character varying(64) not null,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) not null,
    "logs" text,
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone not null default now(),
    "applied_steps_count" integer not null default 0
);


create table "public"."game" (
    "id" integer not null,
    "solution" text not null
);


create table "public"."group" (
    "id" uuid not null,
    "name" text not null,
    "avatar_seed" text not null
);


create table "public"."play" (
    "attempts" text not null,
    "game_id" integer not null,
    "profile_id" uuid not null
);


create table "public"."profile" (
    "id" uuid not null,
    "username" text not null,
    "avatar_seed" text not null,
    "fullname" text not null
);


CREATE UNIQUE INDEX "ProfilesOnGroups_pkey" ON public."ProfilesOnGroups" USING btree (group_id, profile_id);

CREATE UNIQUE INDEX _prisma_migrations_pkey ON public._prisma_migrations USING btree (id);

CREATE UNIQUE INDEX game_pkey ON public.game USING btree (id);

CREATE UNIQUE INDEX group_name_key ON public."group" USING btree (name);

CREATE UNIQUE INDEX group_pkey ON public."group" USING btree (id);

CREATE UNIQUE INDEX play_pkey ON public.play USING btree (game_id, profile_id);

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (id);

CREATE UNIQUE INDEX profile_username_key ON public.profile USING btree (username);

alter table "public"."ProfilesOnGroups" add constraint "ProfilesOnGroups_pkey" PRIMARY KEY using index "ProfilesOnGroups_pkey";

alter table "public"."_prisma_migrations" add constraint "_prisma_migrations_pkey" PRIMARY KEY using index "_prisma_migrations_pkey";

alter table "public"."game" add constraint "game_pkey" PRIMARY KEY using index "game_pkey";

alter table "public"."group" add constraint "group_pkey" PRIMARY KEY using index "group_pkey";

alter table "public"."play" add constraint "play_pkey" PRIMARY KEY using index "play_pkey";

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."ProfilesOnGroups" add constraint "ProfilesOnGroups_group_id_fkey" FOREIGN KEY (group_id) REFERENCES "group"(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."ProfilesOnGroups" validate constraint "ProfilesOnGroups_group_id_fkey";

alter table "public"."ProfilesOnGroups" add constraint "ProfilesOnGroups_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."ProfilesOnGroups" validate constraint "ProfilesOnGroups_profile_id_fkey";

alter table "public"."play" add constraint "play_game_id_fkey" FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."play" validate constraint "play_game_id_fkey";

alter table "public"."play" add constraint "play_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."play" validate constraint "play_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
        begin
            insert into public.profile (id, username, fullname, avatar_seed)
            values (new.id, new.raw_user_meta_data->> 'username', new.raw_user_meta_data ->> 'fullname', new.raw_user_meta_data->> 'avatar_seed');
            return new;
        end;
        $function$
;

CREATE OR REPLACE FUNCTION public.handle_user_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
        begin
          delete from auth.users where id = old.id;
          return old;
        end;
        $function$
;

CREATE TRIGGER on_profile_user_deleted AFTER DELETE ON public.profile FOR EACH ROW EXECUTE FUNCTION handle_user_delete();


