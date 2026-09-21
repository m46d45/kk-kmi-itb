import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/home-view";
import { listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/_app/")({
  loader: () => listPublishedNews({ data: { limit: 4 } }),
  component: HomePage,
});

function HomePage() {
  const news = Route.useLoaderData();
  return <HomeView news={news} locale="en" />;
}
