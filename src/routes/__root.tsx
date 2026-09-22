import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppErrorComponent } from "@/lib/error-component";
import { localeFromPathname, ui } from "@/lib/i18n";
import { contactInfo } from "@/data/research";
import appCss from "../styles.css?url";

const APP_NAME = "KK KMI FTSL ITB";
const host = import.meta.env.VITE_PUBLIC_HOSTNAME;
const ogImage = host ? `https://${host}/og.jpg` : undefined;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchOrganization",
  name: "Construction and Infrastructure Management Research Group",
  alternateName: ["KK KMI", "Kelompok Keahlian Konstruksi dan Manajemen Infrastruktur"],
  url: host ? `https://${host}/` : undefined,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Institut Teknologi Bandung",
    url: "https://www.itb.ac.id",
  },
  department: contactInfo.faculty,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Ganesa No. 10",
    addressLocality: "Bandung",
    postalCode: "40132",
    addressRegion: "West Java",
    addressCountry: "ID",
  },
  email: contactInfo.email,
  telephone: contactInfo.phone,
  sameAs: [contactInfo.linkedin, contactInfo.officialPage],
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Construction and Infrastructure Management Research Group, Faculty of Civil and Environmental Engineering, Institut Teknologi Bandung.",
      },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { name: "theme-color", content: "#00316d" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: APP_NAME },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
          ]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  errorComponent: AppErrorComponent,
  notFoundComponent: NotFoundPage,
  component: RootDocument,
});

function RootDocument() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = localeFromPathname(pathname);

  return (
    <html lang={lang} className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Organization schema for search engines
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const t = ui[localeFromPathname(pathname)];
  return (
    <main className="grid min-h-svh place-items-center bg-bg px-6 text-center text-ink">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">404</p>
        <h1 className="mt-3 font-display text-4xl">{t.notFoundTitle}</h1>
        <p className="mt-3 text-ink-soft">{t.notFoundBody}</p>
        <a href="/" className="mt-6 inline-block text-sm font-medium text-accent">
          {t.backHome}
        </a>
      </div>
    </main>
  );
}
