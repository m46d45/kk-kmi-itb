import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { contactInfo } from "@/data/research";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/people", label: "Faculty" },
  { to: "/news", label: "News" },
  { to: "/widget", label: "Embed" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-bg">
            <span className="font-display text-sm font-medium tracking-tight">KMI</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium uppercase tracking-[0.16em] text-muted">
              FTSL ITB
            </span>
            <span className="block truncate font-display text-base leading-tight text-ink sm:text-lg">
              Construction & Infrastructure Management
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  active ? "bg-surface-2 text-ink" : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink-soft hover:text-ink"
          >
            LinkedIn
          </a>
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-surface-2" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="/admin" className="text-sm text-accent hover:underline">
                News desk
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
            >
              Editor sign-in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-md border border-line bg-surface text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-surface px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-3 text-base text-ink hover:bg-surface-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link to="/admin" className="rounded-md px-3 py-3 text-base text-accent" onClick={() => setOpen(false)}>
                News desk
              </Link>
            ) : (
              <Link to="/login" className="rounded-md px-3 py-3 text-base text-accent" onClick={() => setOpen(false)}>
                Editor sign-in
              </Link>
            )}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-3 text-base text-ink hover:bg-surface-2"
              onClick={() => setOpen(false)}
            >
              LinkedIn
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
