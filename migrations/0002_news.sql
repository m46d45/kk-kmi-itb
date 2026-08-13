create table if not exists news (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null default 'Kegiatan',
  cover_url text not null default '/images/seminar.jpg',
  published integer not null default 1,
  published_at timestamptz not null default now(),
  author_name text not null default 'KK KMI FTSL ITB',
  created_by text not null default 'system',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_published_at_idx on news (published, published_at desc);
