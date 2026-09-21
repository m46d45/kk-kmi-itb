import { Link } from "@tanstack/react-router";
import { formatNewsDate } from "@/components/news-card";
import { NewsBody } from "@/components/news-body";
import { ShareButtons } from "@/components/share-buttons";
import type { NewsItem } from "@/lib/news";
import { ui, type Locale } from "@/lib/i18n";

function sourceLabel(item: { source: string; source_url: string }, locale: Locale) {
  if (!item.source_url) return null;
  if (item.source === "linkedin" || item.source_url.includes("linkedin.com")) {
    return locale === "id" ? "Buka kiriman LinkedIn asli" : "Open the original LinkedIn post";
  }
  if (item.source_url.includes("icecenter.itb.ac.id")) {
    return locale === "id" ? "Buka daftar kursus ICE Center" : "Open the ICE Center course list";
  }
  return locale === "id" ? "Buka laman sumber" : "Open the source page";
}

export function NewsDetailView({
  item,
  related,
  locale,
}: {
  item: NewsItem;
  related: NewsItem[];
  locale: Locale;
}) {
  const sourceText = sourceLabel(item, locale);
  const listTo = locale === "id" ? "/berita" : "/news";
  const detailTo = locale === "id" ? "/berita/$slug" : "/news/$slug";
  const path = locale === "id" ? `/berita/${item.slug}` : `/news/${item.slug}`;
  const t = ui[locale];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to={listTo} className="text-sm text-accent">
        {t.allNews}
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-accent-2">
        {item.source === "linkedin" ? "LinkedIn · " : ""}
        {item.category} · {formatNewsDate(item.published_at, locale)}
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{item.title}</h1>
      <p className="mt-4 text-ink-soft">{item.author_name}</p>

      <ShareButtons path={path} title={item.title} className="mt-6" />

      <img src={item.cover_url} alt="" className="mt-8 aspect-16/9 w-full rounded-xl object-cover" />
      <NewsBody body={item.body} />

      <ShareButtons path={path} title={item.title} className="mt-10 border-t border-line pt-8" />

      {sourceText ? (
        <p className="mt-8 text-sm">
          <a href={item.source_url} target="_blank" rel="noreferrer" className="font-medium text-accent">
            {sourceText}
          </a>
        </p>
      ) : null}

      {related.length ? (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl">{locale === "id" ? "Berita lainnya" : "More news"}</h2>
          <ul className="mt-5 space-y-4">
            {related.map((entry) => (
              <li key={entry.id}>
                <Link to={detailTo} params={{ slug: entry.slug }} className="hover:text-accent">
                  <span className="block text-sm text-muted">{formatNewsDate(entry.published_at, locale)}</span>
                  <span className="font-display text-xl">{entry.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
