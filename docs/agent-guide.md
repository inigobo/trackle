# Agent guide (AI-assisted development)

Conventions and workflows for AI agents (and humans) working on this repo.

## Ground rules

- Read [architecture.md](./architecture.md) first. Respect the layer rules:
  domain has no framework imports; only `infrastructure` touches Prisma; only
  pages/API routes touch HTTP.
- New server-side behavior = **new use case** in
  `src/application/<entity>/useCases/`, wired in
  `src/config/applicationServicesMap.ts`.
- New persistence behavior = extend the domain **repository interface** and its
  Prisma implementation in `src/infrastructure/`.
- New UI = one folder per component (`Component.tsx`, `Component.styles.ts`,
  `index.ts`).
- UI copy is in Spanish; code and comments in English.

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Build (local env) | `npm run build` |
| Apply migrations | `npm run migrate-dev` |
| Tests | *none yet — Jest is installed, `npm test` is broken* |

Path alias: `@/` → repo root. Pages use the `.page.tsx` / `.api.ts` suffixes
(see `next.config.mjs`).

## Definition of done for a change

1. Type-checks and builds: `npm run build`.
2. Lints: `npm run lint`.
3. Respects layer boundaries and the DI map.
4. Migrations included when the schema changes
   (`npx prisma migrate dev --name <change>`).
5. Docs updated if architecture, data model or conventions change.

## Testing strategy (to adopt)

- Unit-test pure logic first: `BoardGenerator` (duplicate letters, accents),
  `PlayDecoder` (malformed URLs), scoring logic.
- Use `game.inMemory.repository.ts` as the pattern for fakes.
- Jest is already a dependency; config and `npm test` script need to be fixed
  (tracked in an issue).

## External constraints

- **No game API exists.** Anything about the daily word must come from the
  user-submitted share URL or manual seeding. Do not design features that
  assume a word list API.
- Supabase Auth is the identity source; `Profile.id === auth.users.id`.
- Never commit `.env*` files or Supabase service keys.
