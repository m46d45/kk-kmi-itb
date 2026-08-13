import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/anggota/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/people/$slug", params: { slug: params.slug } });
  },
});
