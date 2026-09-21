import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsDetailView } from "@/components/news-detail-view";
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
    meta: [
      { title: `${loaderData?.item.title ?? "News"} · KK KMI` },
      ...(loaderData?.item.excerpt
        ? [{ name: "description", content: loaderData.item.excerpt }]
        : []),
    ],
  }),
});

function NewsDetail() {
  const { item, related } = Route.useLoaderData();
  return <NewsDetailView item={item} related={related} locale="en" />;
}
