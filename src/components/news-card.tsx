import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import type { NewsItem } from "@/lib/news";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function formatNewsDate(value: string, locale: Locale = "en") {
  return format(new Date(value), "d MMMM yyyy", locale === "id" ? { locale: localeId } : undefined);
}

export function NewsCard({
  item,
  featured = false,
  externalHref,
  locale = "en",
}: {
  item: NewsItem;
  featured?: boolean;
  externalHref?: string;
  locale?: Locale;
}) {
  const fromLinkedIn = item.source === "linkedin";
  const detailTo = locale === "id" ? "/berita/$slug" : "/news/$slug";
  const t = ui[locale];
  const inner = (
    <>
      <div className="aspect-16/10 overflow-hidden bg-surface-2">
        <img
          src={item.cover_url}
          alt=""
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8" : "p-5")}>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-2">
          {fromLinkedIn ? "LinkedIn · " : ""}
          {item.category} · {formatNewsDate(item.published_at, locale)}
        </p>
        <h3
          className={cn(
            "mt-2 font-display text-ink group-hover:text-accent",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{item.excerpt}</p>
        <span className="mt-5 text-sm font-medium text-accent">{t.readMore}</span>
      </div>
    </>
  );

  const className = cn(
    "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft",
    featured && "md:flex-row md:items-stretch",
  );

  if (externalHref) {
    return (
      <a href={externalHref} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={detailTo} params={{ slug: item.slug }} className={className}>
      {inner}
    </Link>
  );
}
