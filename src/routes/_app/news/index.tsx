import { createFileRoute } from "@tanstack/react-router";
import { NewsListView } from "@/components/news-list-view";
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
  return <NewsListView news={news} locale="en" />;
}
