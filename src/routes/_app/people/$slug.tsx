import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { faculty, getFaculty } from "@/data/faculty";

export const Route = createFileRoute("/_app/people/$slug")({
  loader: ({ params }) => {
    const member = getFaculty(params.slug);
    if (!member) throw notFound();
    return member;
  },
  component: FacultyProfile,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.shortName ?? "Faculty"} · KK KMI` }],
  }),
});

function FacultyProfile() {
  const member = Route.useLoaderData();
  const others = faculty.filter((item) => item.slug !== member.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/people" className="text-sm text-accent">
        Back to directory
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <img
              src={member.photo}
              alt={member.shortName}
              className="aspect-2/3 w-36 shrink-0 rounded-xl object-cover object-top ring-1 ring-line sm:w-44"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">
                {member.role} · {member.rank}
              </p>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl">{member.name}</h1>
              <p className="mt-3 text-ink-soft">{member.credentials}</p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">{member.bio}</p>
          {member.email ? (
            <p className="mt-6 text-sm">
              <a className="text-accent" href={`mailto:${member.email}`}>
                {member.email}
              </a>
            </p>
          ) : null}
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-medium text-accent"
          >
            Official FTSL profile
          </a>
        </div>
        <aside className="rounded-xl border border-line bg-surface p-6 shadow-soft lg:col-span-4">
          <h2 className="font-display text-xl">Research interests</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {member.interests.map((item) => (
              <li key={item} className="border-b border-line pb-3 last:border-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">Keywords</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {member.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-surface-2 px-3 py-1 text-xs text-ink-soft">
                {keyword}
              </span>
            ))}
          </div>
        </aside>
      </div>
      <section className="mt-16">
        <h2 className="font-display text-2xl">Other faculty</h2>
        <div className="mt-5 flex flex-col gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              to="/people/$slug"
              params={{ slug: item.slug }}
              className="rounded-md border border-line bg-surface px-4 py-3 hover:border-accent/30"
            >
              <span className="block font-medium">{item.name}</span>
              <span className="text-sm text-muted">{item.rank}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
