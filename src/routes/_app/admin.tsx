import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ContentPipeline } from "@/components/content-pipeline";
import { formatNewsDate } from "@/components/news-card";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { deleteNews, listAllNews, saveNews, syncLinkedInCatalog, type NewsItem } from "@/lib/news";

export const Route = createFileRoute("/_app/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "News desk · KK KMI" }],
  }),
});

const emptyForm = {
  id: "",
  title: "",
  excerpt: "",
  body: "",
  category: "LinkedIn",
  cover_url: "/images/seminar.jpg",
  author_name: "KK KMI FTSL ITB",
  published: true,
  source_url: "",
};

const covers = [
  "/images/seminar.jpg",
  "/images/lab.jpg",
  "/images/highway.jpg",
  "/images/japan.jpg",
  "/images/lego.jpg",
  "/images/cranes.jpg",
  "/images/site-plan.jpg",
];

function deriveFromPaste(raw: string) {
  const lines = raw
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const title = lines[0] ?? "";
  const rest = lines.slice(1).join("\n\n") || title;
  const excerpt = rest.replace(/\s+/g, " ").slice(0, 220);
  return { title, excerpt, body: rest };
}

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const rows = await listAllNews();
    setItems(rows);
    setLoading(false);
  }

  useEffect(() => {
    if (!user) return;
    void refresh().catch(() => setLoading(false));
  }, [user]);

  if (isPending) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-ink-soft">Loading session…</div>;
  }
  if (!user) return <RedirectToSignIn />;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus(null);
    const derived = !form.title || !form.excerpt ? deriveFromPaste(form.body) : null;
    await saveNews({
      data: {
        id: form.id || undefined,
        title: form.title || derived?.title || "KK KMI LinkedIn post",
        excerpt: form.excerpt || derived?.excerpt || form.body.slice(0, 220),
        body: form.body || derived?.body || form.title,
        category: form.category,
        cover_url: form.cover_url,
        published: form.published,
        author_name: form.author_name,
        source_url: form.source_url,
        source: form.source_url.includes("linkedin.com") ? "linkedin" : "situs",
      },
    });
    setForm(emptyForm);
    setStatus("Published on this site. The FTSL embed will show the same item.");
    await refresh();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">News desk</p>
      <h1 className="mt-3 font-display text-4xl">LinkedIn → this site → FTSL</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        LinkedIn is the source. This site holds the copy. The official FTSL page only hosts the widget, so it does not
        need editing for every new post.
      </p>
      <div className="mt-8">
        <ContentPipeline />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/widget" className="text-sm text-accent">
          Step 3 · FTSL embed code
        </Link>
        <button
          type="button"
          className="text-sm text-accent"
          onClick={async () => {
            const result = await syncLinkedInCatalog();
            setStatus(
              `LinkedIn catalogue synced. ${result.inserted} new, ${result.upserted} updated — ready for FTSL.`,
            );
            await refresh();
          }}
        >
          Reload stored LinkedIn catalogue
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-line bg-surface p-5 shadow-soft lg:col-span-3">
          <p className="font-display text-2xl">Step 2 · copy the post</p>
          <Field label="LinkedIn post URL">
            <input
              required
              type="url"
              value={form.source_url}
              placeholder="https://www.linkedin.com/posts/..."
              onChange={(e) => setForm({ ...form, source_url: e.target.value })}
              className="h-11 w-full rounded-md border border-line bg-bg px-3"
            />
          </Field>
          <Field label="Paste the LinkedIn post text">
            <textarea
              required
              minLength={32}
              rows={8}
              value={form.body}
              placeholder="Copy the post from LinkedIn, then paste it here."
              onChange={(e) => {
                const body = e.target.value;
                const derived = deriveFromPaste(body);
                setForm((prev) => ({
                  ...prev,
                  body,
                  title: prev.title || derived.title,
                  excerpt: prev.excerpt || derived.excerpt,
                }));
              }}
              className="w-full rounded-md border border-line bg-bg px-3 py-2"
            />
          </Field>
          <Field label="Title on this site (editable)">
            <input
              required
              minLength={8}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-11 w-full rounded-md border border-line bg-bg px-3"
            />
          </Field>
          <Field label="Excerpt">
            <textarea
              required
              minLength={16}
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full rounded-md border border-line bg-bg px-3 py-2"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category">
              <input
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="h-11 w-full rounded-md border border-line bg-bg px-3"
              />
            </Field>
            <Field label="Author">
              <input
                required
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="h-11 w-full rounded-md border border-line bg-bg px-3"
              />
            </Field>
          </div>
          <Field label="Cover image">
            <select
              value={form.cover_url}
              onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
              className="h-11 w-full rounded-md border border-line bg-bg px-3"
            >
              {covers.map((src) => (
                <option key={src} value={src}>
                  {src.replace("/images/", "")}
                </option>
              ))}
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Publish to this site and the FTSL widget
          </label>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="min-h-11 rounded-md bg-accent px-4 text-sm font-medium text-on-accent hover:bg-accent-hover">
              {form.id ? "Update copy" : "Publish to site → FTSL"}
            </button>
            {form.id ? (
              <button type="button" className="min-h-11 rounded-md border border-line px-4 text-sm" onClick={() => setForm(emptyForm)}>
                Cancel
              </button>
            ) : null}
          </div>
          {status ? <p className="text-sm text-accent">{status}</p> : null}
        </form>

        <aside className="lg:col-span-2">
          <h2 className="font-display text-2xl">On this site</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted">Loading…</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="rounded-lg border border-line bg-surface p-4">
                  <p className="text-xs text-muted">
                    {item.source === "linkedin" ? "From LinkedIn · " : ""}
                    {item.published ? "Published" : "Draft"} · {formatNewsDate(item.published_at)}
                  </p>
                  <p className="mt-1 font-medium leading-snug">{item.title}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <button
                      type="button"
                      className="text-accent"
                      onClick={() =>
                        setForm({
                          id: item.id,
                          title: item.title,
                          excerpt: item.excerpt,
                          body: item.body,
                          category: item.category,
                          cover_url: item.cover_url,
                          author_name: item.author_name,
                          published: item.published,
                          source_url: item.source_url,
                        })
                      }
                    >
                      Edit
                    </button>
                    {item.source_url ? (
                      <a href={item.source_url} target="_blank" rel="noreferrer" className="text-accent">
                        LinkedIn
                      </a>
                    ) : null}
                    <button
                      type="button"
                      className="text-accent-2"
                      onClick={async () => {
                        if (!window.confirm("Remove this item from the site and the FTSL widget?")) return;
                        await deleteNews({ data: item.id });
                        if (form.id === item.id) setForm(emptyForm);
                        await refresh();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
