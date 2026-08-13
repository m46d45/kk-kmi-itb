import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/berita/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/news/$slug", params: { slug: params.slug } });
  },
});
