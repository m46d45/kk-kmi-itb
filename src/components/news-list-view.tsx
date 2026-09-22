import { NewsCard } from "@/components/news-card";
import type { NewsItem } from "@/lib/news";
import { pages, type Locale } from "@/lib/i18n";

export function NewsListView({ news, locale }: { news: NewsItem[]; locale: Locale }) {
  const t = pages[locale];
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">{t.newsKicker}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t.newsTitle}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.newsLead}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </main>
  );
}
