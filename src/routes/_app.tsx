import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  return (
    <div className="min-h-svh bg-bg text-ink">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
