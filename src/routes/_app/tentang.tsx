import { createFileRoute } from "@tanstack/react-router";
import { AboutView } from "@/components/about-view";

export const Route = createFileRoute("/_app/tentang")({
  component: () => <AboutView locale="id" />,
  head: () => ({
    meta: [{ title: "Tentang · KK KMI FTSL ITB" }],
  }),
});
