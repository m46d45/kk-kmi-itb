import { createFileRoute } from "@tanstack/react-router";
import { listPublishedNews } from "@/lib/news";

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "cache-control": "public, max-age=60",
  };
}

export const Route = createFileRoute("/api/news")({
  server: {
    handlers: {
      OPTIONS: () => new Response(null, { status: 204, headers: corsHeaders() }),
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get("limit") ?? 6);
        const items = await listPublishedNews({ data: { limit } });
        const origin = url.origin;
        const payload = {
          source: "KK KMI FTSL ITB",
          generated_at: new Date().toISOString(),
          items: items.map((item) => ({
            ...item,
            url: `${origin}/news/${item.slug}`,
          })),
        };
        return new Response(JSON.stringify(payload), {
          headers: {
            "content-type": "application/json; charset=utf-8",
            ...corsHeaders(),
          },
        });
      },
    },
  },
});
