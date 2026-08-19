# Backend

The backend lives inside the same Next.js app: API routes under
`src/pages/api`, use cases in `src/application`, repositories in
`src/infrastructure`.

## API routes

| Endpoint | Method | Body / Query | Purpose |
|---|---|---|---|
| `/api/play/create` | POST | `{ playUrl, userId }` | Decode share URL and store the play |
| `/api/group/create` | POST | `{ name, userId }` | Create group, creator becomes member |
| `/api/group/join` | GET | `?u=<userId>&g=<groupId>` | Add user to group |
| `/api/auth/callback` | GET | Supabase code exchange | Auth redirect after email confirmation |
| `/api/auth/confirm` | — | — | Auth confirmation/error helper pages |

`/api/play/create` returns `400` for undecodable URLs, `409` when the play was
already registered (Prisma `P2002` on the composite PK), `500` otherwise; the
client surfaces the returned message.

⚠️ The mutation routes **trust the caller-provided `userId`** — they do not
verify the Supabase session. This must be fixed before any public deployment.

## Use cases (`src/application/*/useCases`)

- **play**: `registerPlayedGame` (decode URL → find game by solution,
  **auto-creating the `Game` row (`max(id)+1`) for unseen solutions** → insert
  play), `getPlayForUserAndDay`, `getAllPlaysFromUser` (joins plays with games
  and paints boards via `BoardGenerator`).
- **profile**: `getProfileByUsername`, `getAllProfilesForGroup`,
  `getProfileStats` (games played, wins, win %, average attempts, current/max
  streak — via `StatsCalculator`).
- **group**: `createGroup`, `addUserToGroup`, `getAllGroupsForUser`,
  `getAllGroups`, `getGroupByName`, `getGroupLeaderboard` (members ranked by
  score: `7 - attempts` points per win, tie-break on wins).

All use cases are instantiated through
`src/config/applicationServicesMap.ts` (manual DI singleton).

## Persistence

- **Prisma ORM** over Supabase Postgres (`DATABASE_URL` pooled, `DIRECT_URL`
  for migrations). Schema: see [data-model.md](./data-model.md).
- Migrations: `npm run migrate-dev` / `migrate-prod` (also seeds the auth
  trigger).
- `prisma/dev.db` (SQLite) and `sqlite3`/`json-server` deps are leftovers from
  the pre-Supabase prototype and should be removed.

## Auth

- **Supabase Auth** with email/password. SSR clients under `utils/supabase/`
  (`serverProps`, `staticProps`, `component`, `api`, `middleware`).
- A DB trigger (`prisma/seedTriggers.ts`, applied in
  `supabase/migrations/*_first-migration.sql`) creates a `profile` row when an
  `auth.users` row is inserted, reading `username`/`full_name` from user
  metadata.

## Play ingestion (the interesting part)

`lapalabradeldia.com` has no API. After a game it offers a share URL like
`...?b=<base64 attempts>&s=<base64 solution>&...`. `PlayDecoder` extracts:

- `s=` → solution word (base64) — used to look up the `Game` row.
- `b=` → attempts, base64 JSON-ish array — stored raw on the play.

`BoardGenerator.paintBoard(attempts, solution, maxAttempts)` then renders the
board with correct duplicate-letter semantics (first pass marks exact matches,
second pass marks present letters only up to their remaining count).

## CI

`.github/workflows/ci.yml` runs on push/PR to `main`: Node 18, `npm ci`,
`npm run build-prod` (prisma generate + `NODE_ENV=production next build`) with
Supabase env vars from GitHub secrets, then `npm test`. **`npm test` currently
runs `next dev` (no tests exist) and will hang the CI job.**
