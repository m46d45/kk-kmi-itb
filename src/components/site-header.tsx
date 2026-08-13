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
    <header className="sticky top-0 z-40 border-b-2 border-accent-2 bg-bg-deep text-on-accent">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/brand/ftsl-mark.png"
            alt="FTSL ITB"
            className="h-10 w-auto shrink-0 sm:h-11"
          />
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium uppercase tracking-[0.16em] text-accent-2">
              KK KMI
            </span>
            <span className="block truncate font-display text-base leading-tight text-on-accent sm:text-lg">
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
                  active ? "bg-white/12 text-on-accent" : "text-on-accent/75 hover:bg-white/10 hover:text-on-accent",
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
            className="text-sm text-on-accent/80 hover:text-on-accent"
          >
            LinkedIn
          </a>
          {isPending ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-white/10" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="/admin" className="text-sm text-accent-2 hover:underline">
                News desk
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-accent-2 px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-2/90"
            >
              Editor sign-in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-md border border-white/20 bg-white/5 text-on-accent lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/15 bg-bg-deep px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-3 text-base text-on-accent hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link to="/admin" className="rounded-md px-3 py-3 text-base text-accent-2" onClick={() => setOpen(false)}>
                News desk
              </Link>
            ) : (
              <Link to="/login" className="rounded-md px-3 py-3 text-base text-accent-2" onClick={() => setOpen(false)}>
                Editor sign-in
              </Link>
            )}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-3 text-base text-on-accent hover:bg-white/10"
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
