# Product

## Vision

Trackle lets groups of friends track and compare their daily results in the
Spanish Wordle game **La palabra del día** (https://lapalabradeldia.com/).
The game does not expose an API or any persistent tracking, so Trackle acts as
the social layer on top: it stores each player's daily board, renders it, and
ranks players inside private groups.

## Users

- **Player**: a registered user who plays the daily game and wants a historical
  record of their boards.
- **Group member**: a player who joins one or more private groups (friends,
  family, coworkers) to compare results.

## Core flows (implemented)

1. **Sign up / log in** — Supabase email auth. Registration asks for a
   username and full name; a `Profile` row is created via a DB trigger on the
   Supabase `auth.users` table (see `prisma/seedTriggers.ts`).
2. **Register a play** — after finishing the daily game on
   lapalabradeldia.com, the user copies the share URL and pastes it into the
   "Add board" modal on their profile page. Trackle decodes the URL, extracts
   the solution and attempts, and stores the play.
3. **View own history** — the profile page lists all past plays as mini-boards
   and renders the selected board full size.
4. **Create / join groups** — any user can create a group; group owners share
   an invitation link (`/join?g=<groupId>`).
5. **Leaderboard** — each group has a leaderboard ranking members by score
   (`7 - attempts` points per win, tie-break on wins), with wins and games
   played per member.
6. **Profile stats** — the profile page shows games played, win percentage,
   average attempts and current/max streak (consecutive day-numbers played).

## Known limitations (as of last commit)

- Play registration depends on a fragile URL format (`b=`/`s=` base64 params);
  malformed URLs return a friendly 400 but format changes would break parsing.
- No automatic detection of the current game day (game ids are inferred as
  `max(id) + 1` when an unseen solution arrives).
- No search/filter on leaderboards (`SearchBar` exists but is commented out).
- No attempt-distribution chart or per-day filtering of stats.
- UI is Spanish-only.

## Roadmap

See the GitHub issues for the planned features. High-level themes:

1. **Scoring & ranking** — turn group leaderboards into actual competitions.
2. **Robust play ingestion** — tolerate URL changes, validate input, dedupe.
3. **Stats** — streaks, averages, distribution charts per player and group.
4. **Quality** — tests, lint, fixed CI, deployment.
