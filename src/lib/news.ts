import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { linkedinCatalog } from "@/data/linkedin";
import { newsSeed } from "@/data/news-seed";
import { editorMiddleware } from "@/lib/auth/editor-middleware";
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

const globalSeed = globalThis as typeof globalThis & {
  __newsCatalogSeedPromise__?: Promise<void>;
};

/** Upsert seed + LinkedIn catalogue once per process (not on every public read). */
export async function ensureNewsCatalogSeeded(): Promise<void> {
  if (!globalSeed.__newsCatalogSeedPromise__) {
    globalSeed.__newsCatalogSeedPromise__ = (async () => {
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
            cover_url = excluded.cover_url,
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
            cover_url = excluded.cover_url,
            source = excluded.source,
            source_url = excluded.source_url,
            author_name = excluded.author_name
        `;
      }
    })().catch((err) => {
      globalSeed.__newsCatalogSeedPromise__ = undefined;
      throw err;
    });
  }
  await globalSeed.__newsCatalogSeedPromise__;
}

export const listPublishedNews = createServerFn({ method: "GET" })
  .validator((input: { limit?: number } | undefined) => ({
    limit: Math.min(Math.max(input?.limit ?? 12, 1), 24),
  }))
  .handler(async ({ data }) => {
    try {
      await ensureNewsCatalogSeeded();
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
      await ensureNewsCatalogSeeded();
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
    await ensureNewsCatalogSeeded();
    const sql = await getSql();
    const rows = await sql<NewsRow>`
      select id, slug, title, excerpt, body, category, cover_url, published, published_at, author_name, created_by, source, source_url
      from news
      order by published_at desc
    `;
    return rows.map(mapNews);
  });

const coverUrlSchema = z
  .string()
  .min(1)
  .refine(
    (value) =>
      value.startsWith("/images/") ||
      value.startsWith("/faculty/") ||
      /^https:\/\//i.test(value),
    { message: "Cover must be a site path under /images/ or an https URL" },
  );

const newsInput = z.object({
  id: z.string().optional(),
  title: z.string().min(8),
  excerpt: z.string().min(16),
  body: z.string().min(32),
  category: z.string().min(2),
  cover_url: coverUrlSchema,
  published: z.boolean(),
  author_name: z.string().min(2),
  source_url: z.string().optional(),
  source: z.string().optional(),
});

export const saveNews = createServerFn({ method: "POST" })
  .middleware([editorMiddleware])
  .validator((input: unknown) => newsInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const sourceUrl = data.source_url?.trim() ?? "";
    const source = data.source?.trim() || (sourceUrl.includes("linkedin.com") ? "linkedin" : "situs");
    if (data.id) {
      // Keep the existing slug so public URLs and the FTSL embed stay stable.
      const existing = await sql<{ slug: string }>`select slug from news where id = ${data.id} limit 1`;
      const slug = existing[0]?.slug ?? slugify(data.title);
      await sql`
        update news
        set title = ${data.title},
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
    let slug = slugify(data.title);
    const clash = await sql<{ n: number }>`select count(*)::int as n from news where slug = ${slug}`;
    if ((clash[0]?.n ?? 0) > 0) {
      slug = `${slug}-${id.slice(0, 8)}`;
    }
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
  .middleware([editorMiddleware])
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    await sql`delete from news where id = ${id}`;
    return { ok: true };
  });

export const syncLinkedInCatalog = createServerFn({ method: "POST" })
  .middleware([editorMiddleware])
  .handler(async () => {
    // Force a fresh upsert even if the process already seeded once.
    globalSeed.__newsCatalogSeedPromise__ = undefined;
    await ensureNewsCatalogSeeded();
    return { upserted: linkedinCatalog.length + newsSeed.length, inserted: 0 };
  });

/** Pure helpers exported for unit tests / debugging. */
export const newsInternals = { mapNews, catalogAsNews, toIso };
