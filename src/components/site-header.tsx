import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { isEditorEmail } from "@/lib/auth/editors";
import { contactInfo } from "@/data/research";
import { localeFromPathname, localePaths, switchLocalePath, ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function navFor(locale: Locale) {
  const t = ui[locale];
  return [
    { to: localePaths.home[locale], label: t.navHome },
    { to: localePaths.about[locale], label: t.navAbout },
    { to: localePaths.research[locale], label: t.navResearch },
    { to: localePaths.people[locale], label: t.navPeople },
    { to: localePaths.news[locale], label: t.navNews },
  ] as const;
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPathname(pathname);
  const t = ui[locale];
  const nav = navFor(locale);
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const otherLocale: Locale = locale === "en" ? "id" : "en";
  const langHref = switchLocalePath(pathname, otherLocale);
  const showDesk = Boolean(user && (user.isDevFallback || isEditorEmail(user.primaryEmail)));

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
              {locale === "id"
                ? "Konstruksi & Manajemen Infrastruktur"
                : "Construction & Infrastructure Management"}
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
            href={langHref}
            className="rounded-md border border-white/20 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide text-on-accent/85 hover:bg-white/10"
            hrefLang={otherLocale}
          >
            {t.langShort}
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-on-accent/80 hover:text-on-accent"
          >
            {t.linkedIn}
          </a>
          {isPending ? (
            <div className="h-8 w-16 animate-pulse rounded-md bg-white/10" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {showDesk ? (
                <Link to="/admin" className="text-sm text-accent-2 hover:underline">
                  {t.newsDesk}
                </Link>
              ) : null}
              <UserButton />
            </div>
          ) : null}
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
            <a
              href={langHref}
              className="rounded-md px-3 py-3 text-base text-on-accent hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t.langLabel}
            </a>
            {showDesk ? (
              <Link to="/admin" className="rounded-md px-3 py-3 text-base text-accent-2" onClick={() => setOpen(false)}>
                {t.newsDesk}
              </Link>
            ) : null}
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-3 py-3 text-base text-on-accent hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t.linkedIn}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
