import { createFileRoute } from "@tanstack/react-router";
import { ResearchView } from "@/components/research-view";

export const Route = createFileRoute("/_app/penelitian")({
  component: () => <ResearchView locale="id" />,
  head: () => ({
    meta: [{ title: "Penelitian · KK KMI FTSL ITB" }],
  }),
});
