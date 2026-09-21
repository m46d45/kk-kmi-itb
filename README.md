# Construction and Infrastructure Management

English + Indonesian website of **KK KMI**, Faculty of Civil and Environmental Engineering, Institut Teknologi Bandung.

Flow: **LinkedIn → this site → official FTSL page** (embed widget).

## Deploy on Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset is detected from the Nitro Vercel output. Build command: `npm run build`.
3. (Recommended) Add a Neon Postgres database and set `DATABASE_URL` so the news desk persists. Without it, the public catalogue still renders.
4. Set `EDITOR_EMAILS` (comma-separated) if news editors are not on `@itb.ac.id`.
5. After the first deploy, copy the embed snippet from `/widget` into the official FTSL WordPress page.

## Local

```bash
npm install
npm run dev
```

## Routes

### English
- `/` home
- `/about` `/research` `/people` `/news`
- `/widget` embed code for FTSL
- `/admin` news desk (editor sign-in required)

### Indonesian
- `/beranda` `/tentang` `/penelitian` `/anggota` `/berita`

### Feeds / SEO
- `/embed` iframe widget · `/embed.js` loader · `/api/news` JSON
- `/sitemap.xml` · `/robots.txt`

## News catalogue

Seed items (`src/data/news-seed.ts`) and the LinkedIn catalogue (`src/data/linkedin.ts`) are upserted **once per process** on first news access (not on every page view). Editors can force a resync from `/admin`.
