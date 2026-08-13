import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsCard } from "@/components/news-card";
import { listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/embed")({
  validateSearch: (search: Record<string, unknown>) => ({
    limit: Math.min(Math.max(Number(search.limit ?? 4) || 4, 1), 8),
  }),
  loaderDeps: ({ search }) => ({ limit: search.limit }),
  loader: ({ deps }) => listPublishedNews({ data: { limit: deps.limit } }),
  component: EmbedWidget,
  head: () => ({
    meta: [{ title: "KK KMI news" }, { name: "robots", content: "noindex" }],
  }),
});

function EmbedWidget() {
  const news = Route.useLoaderData();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
    const send = () => {
      const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      window.parent?.postMessage({ type: "kmi-embed-height", height }, "*");
    };
    send();
    const observer = new ResizeObserver(send);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [news.length]);

  return (
    <div className="min-h-full bg-bg px-1 py-2 text-ink">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-2">KK KMI · FTSL ITB</p>
          <h1 className="font-display text-2xl">Latest news</h1>
        </div>
        <a href={`${origin}/news`} target="_blank" rel="noreferrer" className="text-sm text-accent">
          All news
        </a>
      </div>
      {news.length === 0 ? (
        <p className="text-sm text-ink-soft">No published news yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} externalHref={`${origin}/news/${item.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
