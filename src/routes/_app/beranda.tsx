import { createFileRoute } from "@tanstack/react-router";
import { HomeView } from "@/components/home-view";
import { listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/_app/beranda")({
  loader: () => listPublishedNews({ data: { limit: 4 } }),
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "KK KMI FTSL ITB",
      },
      {
        name: "description",
        content:
          "Kelompok Keahlian Konstruksi dan Manajemen Infrastruktur, Fakultas Teknik Sipil dan Lingkungan, Institut Teknologi Bandung.",
      },
    ],
  }),
});

function HomePage() {
  const news = Route.useLoaderData();
  return <HomeView news={news} locale="id" />;
}
