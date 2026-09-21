import { createFileRoute } from "@tanstack/react-router";
import { ResearchView } from "@/components/research-view";

export const Route = createFileRoute("/_app/research")({
  component: () => <ResearchView locale="en" />,
  head: () => ({
    meta: [{ title: "Research · KK KMI FTSL ITB" }],
  }),
});
