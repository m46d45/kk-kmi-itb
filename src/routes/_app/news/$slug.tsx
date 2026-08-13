import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { formatNewsDate } from "@/components/news-card";
import { ShareButtons } from "@/components/share-buttons";
import { getNewsBySlug, listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/_app/news/$slug")({
  loader: async ({ params }) => {
    const item = await getNewsBySlug({ data: params.slug });
    if (!item) throw notFound();
    const related = (await listPublishedNews({ data: { limit: 4 } }))
      .filter((n) => n.slug !== item.slug)
      .slice(0, 3);
    return { item, related };
  },
  component: NewsDetail,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.item.title ?? "News"} · KK KMI` }],
  }),
});

function NewsDetail() {
  const { item, related } = Route.useLoaderData();
  const paragraphs = item.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/news" className="text-sm text-accent">
        All news
      </Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-accent-2">
        {item.source === "linkedin" ? "LinkedIn · " : ""}
        {item.category} · {formatNewsDate(item.published_at)}
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{item.title}</h1>
      <p className="mt-4 text-ink-soft">{item.author_name}</p>

      <ShareButtons
        path={`/news/${item.slug}`}
        title={item.title}
        className="mt-6"
      />

      <img
        src={item.cover_url}
        alt=""
        className="mt-8 aspect-16/9 w-full rounded-xl object-cover"
      />
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <ShareButtons
        path={`/news/${item.slug}`}
        title={item.title}
        className="mt-10 border-t border-line pt-8"
      />

      {item.source_url ? (
        <p className="mt-8 text-sm">
          <a href={item.source_url} target="_blank" rel="noreferrer" className="font-medium text-accent">
            Open the original LinkedIn post
          </a>
        </p>
      ) : null}

      {related.length ? (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl">More news</h2>
          <ul className="mt-5 space-y-4">
            {related.map((entry) => (
              <li key={entry.id}>
                <Link to="/news/$slug" params={{ slug: entry.slug }} className="hover:text-accent">
                  <span className="block text-sm text-muted">{formatNewsDate(entry.published_at)}</span>
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
