# Trackle

Track your daily Spanish Wordle ([La palabra del día](https://lapalabradeldia.com/)) results and compete with friends in private groups.

The game has no API or tracking, so after playing you paste the share URL it generates — Trackle decodes it, stores your board, and ranks your group.

## Documentation

See **[docs/](./docs/README.md)** for product, architecture, frontend, backend, data model and the AI-agent development guide.

## Quick start

```bash
npm install
npm run migrate-dev
npm run dev
```

Requires `.env.local` with `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
