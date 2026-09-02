import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { linkedinCatalog } from "@/data/linkedin";
import { newsSeed } from "@/data/news-seed";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { slugify } from "@/lib/utils";

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_url: string;
  published: boolean;
  published_at: string;
  author_name: string;
  created_by: string;
  source: string;
  source_url: string;
};

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_url: string;
  published: number | boolean;
  published_at: string | Date;
  author_name: string;
  created_by: string;
  source: string;
  source_url: string;
};

function toIso(value: string | Date) {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}

function mapNews(row: NewsRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    category: row.category,
    cover_url: row.cover_url,
    published: row.published === true || row.published === 1,
    published_at: toIso(row.published_at),
    author_name: row.author_name,
    created_by: row.created_by,
    source: row.source || "situs",
    source_url: row.source_url || "",
  };
}

function catalogAsNews(): NewsItem[] {
  const fromLinkedIn: NewsItem[] = linkedinCatalog.map((item) => ({
    id: item.slug,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    category: item.category,
    cover_url: item.cover_url,
    published: true,
    published_at: item.published_at,
    author_name: item.author_name,
    created_by: "linkedin",
    source: "linkedin",
    source_url: item.source_url,
  }));
  const fromSite: NewsItem[] = newsSeed.map((item) => ({
    id: item.slug,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
    category: item.category,
    cover_url: item.cover_url,
    published: true,
    published_at: item.published_at,
    author_name: item.author_name,
    created_by: "system",
    source: "situs",
    source_url: item.source_url ?? "",
  }));
  return [...fromLinkedIn, ...fromSite].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}

async function upsertCatalog() {
  const sql = await getSql();
  for (const item of newsSeed) {
    await sql`
      insert into news (id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url)
      values (
        ${crypto.randomUUID()}, ${item.slug}, ${item.title}, ${item.excerpt}, ${item.body},
        ${item.category}, ${item.cover_url}, ${1}, ${item.published_at}, ${item.author_name},
        ${"system"}, ${"situs"}, ${item.source_url ?? ""}
      )
      on conflict (slug) do update set
        title = excluded.title,
        excerpt = excluded.excerpt,
        body = excluded.body,
        category = excluded.category,
        author_name = excluded.author_name,
        source_url = excluded.source_url
    `;
  }
  for (const item of linkedinCatalog) {
    await sql`
      insert into news (id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url)
      values (
        ${crypto.randomUUID()}, ${item.slug}, ${item.title}, ${item.excerpt}, ${item.body},
        ${item.category}, ${item.cover_url}, ${1}, ${item.published_at}, ${item.author_name},
        ${"linkedin"}, ${"linkedin"}, ${item.source_url}
      )
      on conflict (slug) do update set
        title = excluded.title,
        excerpt = excluded.excerpt,
        body = excluded.body,
        category = excluded.category,
        source = excluded.source,
        source_url = excluded.source_url,
        author_name = excluded.author_name
    `;
  }
}

export const listPublishedNews = createServerFn({ method: "GET" })
  .validator((input: { limit?: number } | undefined) => ({
    limit: Math.min(Math.max(input?.limit ?? 12, 1), 24),
  }))
  .handler(async ({ data }) => {
    try {
      await upsertCatalog();
      const sql = await getSql();
      const rows = await sql<NewsRow>`
        select id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url
        from news
        where published = 1
        order by published_at desc
        limit ${data.limit}
      `;
      return rows.map(mapNews);
    } catch (error) {
      console.error("[news] falling back to catalogue", error);
      return catalogAsNews().slice(0, data.limit);
    }
  });

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      await upsertCatalog();
      const sql = await getSql();
      const rows = await sql<NewsRow>`
        select id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url
        from news
        where slug = ${slug} and published = 1
        limit 1
      `;
      return rows[0] ? mapNews(rows[0]) : null;
    } catch (error) {
      console.error("[news] falling back to catalogue", error);
      return catalogAsNews().find((item) => item.slug === slug) ?? null;
    }
  });

export const listAllNews = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    await upsertCatalog();
    const sql = await getSql();
    const rows = await sql<NewsRow>`
      select id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url
      from news
      order by published_at desc
    `;
    return rows.map(mapNews);
  });

const newsInput = z.object({
  id: z.string().optional(),
  title: z.string().min(8),
  excerpt: z.string().min(16),
  body: z.string().min(32),
  category: z.string().min(2),
  cover_url: z.string().min(1),
  published: z.boolean(),
  author_name: z.string().min(2),
  source_url: z.string().optional(),
  source: z.string().optional(),
});

export const saveNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => newsInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const slug = slugify(data.title);
    const sourceUrl = data.source_url?.trim() ?? "";
    const source = data.source?.trim() || (sourceUrl.includes("linkedin.com") ? "linkedin" : "situs");
    if (data.id) {
      await sql`
        update news
        set title = ${data.title},
            slug = ${slug},
            excerpt = ${data.excerpt},
            body = ${data.body},
            category = ${data.category},
            cover_url = ${data.cover_url},
            published = ${data.published ? 1 : 0},
            author_name = ${data.author_name},
            source = ${source},
            source_url = ${sourceUrl},
            updated_at = now()
        where id = ${data.id}
      `;
      return { id: data.id, slug };
    }
    const id = crypto.randomUUID();
    await sql`
      insert into news (id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url)
      values (
        ${id}, ${slug}, ${data.title}, ${data.excerpt}, ${data.body}, ${data.category},
        ${data.cover_url}, ${data.published ? 1 : 0}, now(), ${data.author_name},
        ${context.userId}, ${source}, ${sourceUrl}
      )
    `;
    return { id, slug };
  });

export const deleteNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from news where id = ${id}`;
    return { ok: true };
  });

export const syncLinkedInCatalog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    let inserted = 0;
    for (const item of linkedinCatalog) {
      const before = await sql<{ n: number }>`select count(*)::int as n from news where slug = ${item.slug}`;
      await sql`
        insert into news (id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url)
        values (
          ${crypto.randomUUID()}, ${item.slug}, ${item.title}, ${item.excerpt}, ${item.body},
          ${item.category}, ${item.cover_url}, ${1}, ${item.published_at}, ${item.author_name},
          ${"linkedin"}, ${"linkedin"}, ${item.source_url}
        )
        on conflict (slug) do update set
          title = excluded.title,
          excerpt = excluded.excerpt,
          body = excluded.body,
          category = excluded.category,
          cover_url = excluded.cover_url,
          source = excluded.source,
          source_url = excluded.source_url,
          author_name = excluded.author_name,
          updated_at = now()
      `;
      if ((before[0]?.n ?? 0) === 0) inserted += 1;
    }
    return { upserted: linkedinCatalog.length, inserted };
  });
