import { createFileRoute } from "@tanstack/react-router";

const script = `(() => {
  const current = document.currentScript;
  if (!current) return;
  const origin = new URL(current.src).origin;
  const limit = current.getAttribute("data-limit") || "4";
  const targetSel = current.getAttribute("data-target");
  const mount = targetSel ? document.querySelector(targetSel) : current.parentNode;
  if (!mount) return;
  const iframe = document.createElement("iframe");
  iframe.src = origin + "/embed?limit=" + encodeURIComponent(limit);
  iframe.title = "KK KMI FTSL ITB news";
  iframe.style.width = "100%";
  iframe.style.border = "0";
  iframe.style.minHeight = "640px";
  iframe.loading = "lazy";
  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "kmi-embed-height") return;
    if (typeof event.data.height === "number") {
      iframe.style.height = event.data.height + "px";
    }
  });
  mount.appendChild(iframe);
})();
`;

export const Route = createFileRoute("/embed.js")({
  server: {
    handlers: {
      GET: () =>
        new Response(script, {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "access-control-allow-origin": "*",
            "cache-control": "public, max-age=300",
          },
        }),
    },
  },
});
