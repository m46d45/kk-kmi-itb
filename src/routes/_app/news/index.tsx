import { createFileRoute } from "@tanstack/react-router";
import { NewsCard } from "@/components/news-card";
import { listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/_app/news/")({
  loader: () => listPublishedNews({ data: { limit: 24 } }),
  component: NewsPage,
  head: () => ({
    meta: [{ title: "News · KK KMI FTSL ITB" }],
  }),
});

function NewsPage() {
  const news = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Archive</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">News and events</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Combined from this site and the group LinkedIn page. The embed on the official FTSL page uses the same feed.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
