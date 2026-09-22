import { createFileRoute } from "@tanstack/react-router";
import { newsSeed } from "@/data/news-seed";
import { linkedinCatalog } from "@/data/linkedin";
import { faculty } from "@/data/faculty";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const staticPaths = [
          "/",
          "/beranda",
          "/about",
          "/tentang",
          "/research",
          "/penelitian",
          "/people",
          "/anggota",
          "/news",
          "/berita",
          "/widget",
        ];
        const facultyPaths = faculty.flatMap((m) => [`/people/${m.slug}`, `/anggota/${m.slug}`]);
        const newsSlugs = [...newsSeed, ...linkedinCatalog].map((n) => n.slug);
        const newsPaths = newsSlugs.flatMap((slug) => [`/news/${slug}`, `/berita/${slug}`]);
        const urls = [...staticPaths, ...facultyPaths, ...newsPaths];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${origin}${path}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
