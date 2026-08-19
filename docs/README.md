# Trackle Documentation

Trackle tracks games of the Spanish Wordle (*La palabra del día*, https://lapalabradeldia.com/) for groups of friends. The game has no public API, so users register their daily plays by pasting the share URL the game generates after finishing a board.

## Documents

| Doc | Content |
|---|---|
| [product.md](./product.md) | Product vision, users, current features and roadmap |
| [architecture.md](./architecture.md) | High-level architecture and layer responsibilities |
| [frontend.md](./frontend.md) | Pages, components, styling and client-side behavior |
| [backend.md](./backend.md) | API routes, use cases, repositories, auth |
| [data-model.md](./data-model.md) | Database schema and entity relationships |
| [agent-guide.md](./agent-guide.md) | Conventions and workflows for AI-assisted development |

## Quick start

```bash
npm install
npm run migrate-dev   # apply Prisma migrations (needs .env.local)
npm run dev           # http://localhost:3000
```

Required environment variables (`.env.local`): `DATABASE_URL`, `DIRECT_URL`,
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
