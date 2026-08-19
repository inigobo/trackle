# Architecture

Trackle is a **Next.js 14 (Pages Router) monolith** written in TypeScript,
following a light **hexagonal / clean architecture** inside `src/`:

```
┌────────────────────────────────────────────────────┐
│                    Next.js app                     │
│                                                    │
│  src/pages        pages + API routes (HTTP edge)   │
│  src/ui           React components, contexts       │
│  src/application  use cases (orchestration)        │
│  src/domain       entities + repository interfaces │
│  src/infrastructure  Prisma repository impls       │
│  src/services     domain services (Board, Decoder) │
│  src/config       DI wiring (applicationServicesMap)│
└──────────────┬─────────────────────────┬───────────┘
               │                         │
        Supabase Auth            Supabase Postgres
        (email login)            (via Prisma ORM)
```

## Layer responsibilities

### `src/domain`
Pure types and repository **interfaces** — no framework imports.
- `board/` — `Board`, `PaintedWord`, `LetterState` (`Correct`, `Present`,
  `Missing`, `Empty`).
- `game/` — `Game` (id = day number, solution) + `GameRepository`.
- `play/` — `Play`, `PlayWithBoard` + `PlayRepository`.
- `profile/` — `Profile` + `ProfileRepository`.
- `group/` — `Group` + `GroupRepository`.

### `src/application`
Use cases, one class per file under `useCases/`, each exposing `run(...)`.
They depend only on domain interfaces and services. Examples:
`RegisterPlayedGameUseCase`, `GetAllPlaysFromUserUseCase`,
`CreateGroupUseCase`, `AddUserToGroupUseCase`.

### `src/infrastructure`
Prisma implementations of the repository interfaces (`*.prisma.repository.ts`),
plus `database/PrismaConnection.ts`. An in-memory game repository exists for
testing (`game.inMemory.repository.ts`).

### `src/services`
Stateless domain services:
- `BoardGenerator` — paints a `Board` from attempts + solution (Wordle
  letter-matching rules, including duplicate-letter handling).
- `PlayDecoder` — extracts base64-encoded attempts (`b=` param) and solution
  (`s=` param) from the share URL of lapalabradeldia.com.
- `apiCalls.js` — external APIs: DiceBear avatars, GIPHY search.

### `src/config/applicationServicesMap.ts`
Manual dependency injection: a singleton that instantiates repositories and
services and exposes factory methods for every use case. **All pages and API
routes obtain use cases through this map.**

### `src/ui`
React components (co-located `.styles.ts` using Stitches) and the
`applicationServicesContext` (currently unused legacy — prefer the config map
on the server side).

## Dependency rules

- Pages/API routes → application use cases → domain interfaces.
- Only `infrastructure` talks to the database; only pages/API routes talk HTTP.
- Domain never imports from outer layers.

## Cross-cutting

- **Auth**: Supabase Auth (email/password). Client helpers live in
  `utils/supabase/` (`serverProps`, `component`, `api`, `staticProps`,
  `middleware`). Server-side pages call `createClient(context)` and
  `supabase.auth.getUser()`.
- **Profile provisioning**: a Postgres trigger on `auth.users` inserts the
  matching `profile` row (`prisma/seedTriggers.ts`).
- **Styling**: mix of Stitches (`@stitches/react`) and react-bootstrap; global
  CSS in `src/styles/`.
- **CI**: `.github/workflows/ci.yml` — npm ci + production build on Node 18.
