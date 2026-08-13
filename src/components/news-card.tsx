import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import type { NewsItem } from "@/lib/news";
import { cn } from "@/lib/utils";

export function formatNewsDate(value: string) {
  return format(new Date(value), "d MMMM yyyy");
}

export function NewsCard({
  item,
  featured = false,
  externalHref,
}: {
  item: NewsItem;
  featured?: boolean;
  externalHref?: string;
}) {
  const href = externalHref ?? `/news/${item.slug}`;
  const fromLinkedIn = item.source === "linkedin";
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
          {item.category} · {formatNewsDate(item.published_at)}
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
        <span className="mt-5 text-sm font-medium text-accent">Read more</span>
      </div>
    </>
  );

  const className = cn(
    "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft",
    featured && "md:flex-row md:items-stretch",
  );

  if (externalHref) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link to="/news/$slug" params={{ slug: item.slug }} className={className}>
      {inner}
    </Link>
  );
}
