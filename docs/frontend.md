# Frontend

## Stack

- Next.js 14 **Pages Router** (files use the `.page.tsx` convention via
  `next.config.mjs` `pageExtensions`), React 18, TypeScript.
- Styling: **Stitches** (`styled` from `@stitches/react`) for layout-level
  styles + **react-bootstrap** components. Global CSS in `src/styles/`.
- Data fetching: **server-side only** (`getServerSideProps`) for page data;
  client `fetch` for mutations against `/api/*` routes. `swr` is installed but
  not meaningfully used.

## Pages

| Route | File | Auth | Purpose |
|---|---|---|---|
| `/` | `pages/index.page.tsx` | optional | Welcome card + user's group list (or login link) |
| `/login` | `pages/login/index.page.tsx` | no | Supabase email login form |
| `/register` | `pages/register/index.page.tsx` | no | Sign-up form (username, fullname, password) |
| `/profile/[username]` | `pages/profile/[username].page.tsx` | optional | Player profile: info, big board of selected play, mini-board collection, Add-board modal |
| `/leaderboard/[groupName]` | `pages/leaderboard/[groupName].page.tsx` | required | Group members list + copy-invite-link button |
| `/join` | `pages/join/index.page.tsx` | required | Accept group invitation (`?g=<groupId>`) |

All pages resolve the Supabase user in `getServerSideProps` via
`utils/supabase/serverProps.createClient(context)` and fetch domain data
through `applicationServicesMap` use cases. Protected pages redirect to
`/login` when unauthenticated.

## Key components (`src/ui/components`)

- **Board** — full-size Wordle board; composed of `WordRow` → `LetterTile`
  colored by `LetterState`.
- **MiniBoard** — compact board preview used in collections.
- **PlayCollection** — grid of a user's plays; selecting one sets the board
  shown on the profile page.
- **AddBoardModal** — paste the lapalabradeldia.com share URL; POSTs to
  `/api/play/create`.
- **GroupList / GroupCard / CreateGroupModal** — group listing and creation.
- **UserList / UserCard** — leaderboard member display.
- **ProfileInfo / InfoContainer** — profile header.
- **LoginForm / LoginCard / RegisterForm / RegisterCard / WelcomeCard** —
  auth and landing UI. Login uses Formik + Yup.
- **Navbar, Avatar (DiceBear), Icon, SearchBar** — misc. `SearchBar` is built
  but currently commented out of the leaderboard page.

## Conventions

- One folder per component with `Component.tsx`, `Component.styles.ts`,
  `index.ts` barrel.
- Path alias `@/` maps to the repo root (`@/src/...`, `@/utils/...`).
- UI copy is in **Spanish**.

## Known issues

- `LeaderboardPage` hardcodes `http://localhost:3000` in the invite link.
- `ProfileDetailPage` hardcodes the initially selected game (`showGameId = 788`).
- `Navbar` is not wired into `_app.page.tsx` layout consistently.
