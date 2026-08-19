# Data model

Prisma schema: `prisma/schema.prisma` (Postgres on Supabase).
SQL mirror with triggers: `supabase/schema.sql`.

```
auth.users (Supabase)                 Game
       │ 1                        ┌────────────┐
       │    trigger on insert     │ id (int)   │  ← wordle day number
       ▼                          │ solution   │
   ┌──────────┐                   └─────┬──────┘
   │ Profile  │                         │ 1
   │──────────│                         │
   │ id (uuid)│◄─────────────────┐       │
   │ username │◄──┐              │ N     ▼ N
   │ fullname │   │           ┌───────────────┐
   │ avatar_seed│ │           │ Play          │
   └────┬─────┘   │           │───────────────│
        │         │           │ game_id   (PK)│
        │ N       │ N         │ profile_id(PK)│
   ┌────┴─────────────┐       │ attempts      │ ← JSON-ish string of words
   │ ProfilesOnGroups │       └───────────────┘
   │──────────────────│
   │ group_id    (PK) │
   │ profile_id  (PK) │
   └────┬─────────────┘
        │ N
   ┌────┴──────┐
   │ Group     │
   │───────────│
   │ id (uuid) │
   │ name      │ unique
   │ avatar_seed│
   └───────────┘
```

## Notes

- **Game.id** is the wordle day number (e.g. 788), not a surrogate key — this
  is how "today's game" is identified.
- **Play** has a composite PK `(game_id, profile_id)`: one play per user per
  day. Deleting a profile cascades to its plays.
- **Play.attempts** is stored as a single string (the decoded `b=` payload).
- **Profile.id** equals the Supabase `auth.users.id`; profiles are created by
  trigger, not by application code.
- Avatars are not stored — only a **seed** string; images are generated from
  DiceBear at render time.

## Seed data

`prisma/seed.ts` + `prisma/seedData/` provide demo games, profiles and plays
for local development.
