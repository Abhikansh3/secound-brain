# Brainly — Second Brain

A personal bookmarking app for saving links from YouTube and Twitter/X into one place, and optionally publishing that collection behind a shareable link.

Save a link, it renders as an embedded card. Flip sharing on and you get a hash URL that lets anyone view your collection read-only.

## Stack

| | |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 8, Tailwind CSS v4 |
| **Backend** | Express 5, Mongoose, JWT auth |
| **Database** | MongoDB (local, `secound-brain`) |

## Layout

```
.
├── backend/
│   └── src/
│       ├── index.ts        # Express app + all routes
│       ├── db.ts           # Mongoose connection & models (User, Content, Links)
│       ├── middleware.ts   # JWT auth guard
│       ├── config.ts       # JWT secret
│       └── utlis.ts        # random hash generator for share links
└── frontend/
    └── src/
        ├── App.tsx         # Page shell
        ├── index.css       # Tailwind import + theme colors
        ├── components/     # Button, Card, Sidebar, SidebarItem, CreateContentModal, Logo
        └── icons/          # Inline SVG icons
```

## Data model

Three collections, defined in [`backend/src/db.ts`](backend/src/db.ts):

- **User** — `username` (unique), `password`
- **Content** — `title`, `link`, `tags[]`, `userId` → User
- **Links** — `hash`, `userId` → User (unique, one share link per user)

## API

All routes are under `/api/v1`. Protected routes expect a raw JWT in the `Authorization` header (no `Bearer` prefix).

| Method | Route | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/v1/signup` | — | Create an account |
| `POST` | `/api/vq/signin` ⚠️ | — | Exchange credentials for a JWT |
| `POST` | `/api/v1/content` | ✅ | Save a link |
| `GET` | `/api/v1/content` | ✅ | List your saved links |
| `DELETE` | `/api/v1/content` | ✅ | Remove a link |
| `POST` | `/api/v1/brain/share` | ✅ | Toggle sharing; returns a hash |
| `GET` | `/api/v1/brain/:shareLink` | — | View a shared collection |

⚠️ The signin path is `/api/vq/signin` — a typo for `v1` at [`index.ts:30`](backend/src/index.ts#L30).

## Frontend

The UI is a two-pane layout: a sidebar filtering by source (Twitter / YouTube) and a content grid of cards. `Card` renders YouTube links as embedded iframes by rewriting the watch URL, and Twitter links as blockquotes picked up by the `widgets.js` script in [`index.html`](frontend/index.html).

Colors are Tailwind v4 theme tokens defined in [`frontend/src/index.css`](frontend/src/index.css) — see [COLORS.md](frontend/COLORS.md) for the palette and how to extend it.

## Running it

**Prerequisites:** Node.js, and MongoDB running locally on `27017`.

```bash
# backend
cd backend
npm install
npm install mongoose        # see note below
npm run dev                 # builds, then serves on :3000

# frontend
cd frontend
npm install
npm run dev                 # Vite dev server on :5173
```

Set `JWT_SECRET` in the environment before running anything real — [`config.ts`](backend/src/config.ts) falls back to a hardcoded dev value otherwise.

## Current status

The frontend and backend are both partly built but **not yet connected** — [`App.tsx`](frontend/src/App.tsx) renders two hardcoded cards and makes no network calls. Wiring them together is the next step.

Known gaps, roughly in the order they'll bite:

- **`mongoose` is missing from [`backend/package.json`](backend/package.json)** even though [`db.ts`](backend/src/db.ts) imports it. The server won't boot until it's installed and saved as a dependency.
- **No CORS middleware.** Once the frontend starts calling the API, requests from `:5173` to `:3000` will be blocked.
- **Passwords are stored in plaintext.** [`signup`](backend/src/index.ts#L11) writes `req.body.password` straight to Mongo and [`signin`](backend/src/index.ts#L30) matches on it directly. Needs bcrypt hashing before this goes anywhere public.
- **`DELETE /api/v1/content` doesn't work.** It filters on `contentId` and `UserId`, neither of which exists in `ContentSchema` (the field is `_id` and `userId`), and it never sends a response — so the request hangs.
- **`/brain/share` returns inconsistent shapes** — `{ hash }` when a link already exists, `{ message: hash }` when creating a new one.
- **No input validation** on any route.
