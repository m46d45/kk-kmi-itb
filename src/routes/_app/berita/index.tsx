import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/berita/")({
  beforeLoad: () => {
    throw redirect({ to: "/news" });
  },
});
