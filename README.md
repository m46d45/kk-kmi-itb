# Construction and Infrastructure Management

English website of **KK KMI**, Faculty of Civil and Environmental Engineering, Institut Teknologi Bandung.

Flow: **LinkedIn → this site → official FTSL page** (embed widget).

## Deploy on Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset is detected from the Nitro Vercel output. Build command: `npm run build`.
3. (Recommended) Add a Neon Postgres database and set `DATABASE_URL` so the news desk persists. Without it, the public catalogue still renders.
4. After the first deploy, copy the embed snippet from `/widget` into the official FTSL WordPress page.

## Local

```bash
npm install
npm run dev
```

## Routes

- `/` home
- `/about` `/research` `/people` `/news`
- `/widget` embed code for FTSL
- `/admin` news desk (sign-in required)
