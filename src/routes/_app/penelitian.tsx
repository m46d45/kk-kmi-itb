import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/penelitian")({
  beforeLoad: () => {
    throw redirect({ to: "/research" });
  },
});
