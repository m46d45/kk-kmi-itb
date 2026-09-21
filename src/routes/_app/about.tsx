import { createFileRoute } from "@tanstack/react-router";
import { AboutView } from "@/components/about-view";

export const Route = createFileRoute("/_app/about")({
  component: () => <AboutView locale="en" />,
  head: () => ({
    meta: [{ title: "About · KK KMI FTSL ITB" }],
  }),
});
