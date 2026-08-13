import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tentang")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
