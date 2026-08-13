import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ContentPipeline } from "@/components/content-pipeline";

export const Route = createFileRoute("/_app/widget")({
  component: WidgetPage,
  head: () => ({
    meta: [{ title: "Embed for FTSL · KK KMI" }],
  }),
});

function WidgetPage() {
  const [limit, setLimit] = useState(4);
  const [origin, setOrigin] = useState("https://YOUR-SITE-DOMAIN");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const iframeCode = `<iframe
  src="${origin}/embed?limit=${limit}"
  title="KK KMI FTSL ITB news"
  style="width:100%;min-height:640px;border:0;background:transparent;"
  loading="lazy"
></iframe>`;

  const scriptCode = `<div id="kmi-news"></div>
<script
  src="${origin}/embed.js"
  data-target="#kmi-news"
  data-limit="${limit}"
  async
></script>`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Step 3 · FTSL ITB</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">The official page only hosts the widget</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        The flow stays LinkedIn first, then this site, then ITB. Paste the code below once into
        {" "}
        <span className="italic">kelompok-keahlian/manajemen-dan-rekayasa-konstruksi</span>
        . After that, every post copied onto this site appears automatically on FTSL.
      </p>

      <div className="mt-8">
        <ContentPipeline />
      </div>

      <p className="mt-6 text-sm">
        <Link to="/admin" className="font-medium text-accent">
          Go to step 2 · copy a LinkedIn post
        </Link>
      </p>

      <label className="mt-10 flex max-w-xs flex-col gap-2 text-sm">
        Cards on the FTSL page
        <input
          type="range"
          min={2}
          max={6}
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
          className="accent-accent"
        />
        <span className="text-muted">{limit} latest items</span>
      </label>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CodeBlock title="Paste into FTSL WordPress · iframe" code={iframeCode} />
        <CodeBlock title="Or script + JSON feed" code={scriptCode} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Preview on the ITB page</h2>
        <p className="mt-2 text-sm text-ink-soft">This is what appears after the code is pasted.</p>
        <div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface">
          <iframe title="News embed preview" src={`/embed?limit=${limit}`} className="h-[720px] w-full border-0" />
        </div>
      </section>
    </main>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-line bg-bg-deep p-5 text-on-accent">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium">{title}</p>
        <button
          type="button"
          className="shrink-0 rounded-md bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mt-4 overflow-x-auto text-xs leading-relaxed text-on-accent/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}
