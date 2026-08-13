alter table news add column if not exists source text not null default 'situs';
alter table news add column if not exists source_url text not null default '';
