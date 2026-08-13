import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/anggota/")({
  beforeLoad: () => {
    throw redirect({ to: "/people" });
  },
});
