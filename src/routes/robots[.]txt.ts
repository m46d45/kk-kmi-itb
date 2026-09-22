import { createFileRoute } from "@tanstack/react-router";

const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /embed
Disallow: /api/

Sitemap: /sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const text = body.replace("Sitemap: /sitemap.xml", `Sitemap: ${origin}/sitemap.xml`);
        return new Response(text, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
