import { createFileRoute } from "@tanstack/react-router";
import { faculty, facultyStats } from "@/data/faculty";
import { aboutCopy, contactInfo } from "@/data/research";

export const Route = createFileRoute("/_app/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About · KK KMI FTSL ITB" }],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Group profile</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{aboutCopy.name}</h1>
      <p className="mt-3 text-lg italic text-ink-soft">{aboutCopy.indonesian}</p>
      <p className="mt-4 max-w-3xl text-base text-ink-soft">{aboutCopy.tagline}</p>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">{aboutCopy.body}</p>

      <div className="mt-10 overflow-hidden rounded-xl">
        <img src="/images/hero.jpg" alt="Tropical academic campus" className="aspect-21/9 w-full object-cover" />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="rounded-xl border border-line bg-surface p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-2xl">Role and scope</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{aboutCopy.pioneer}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{aboutCopy.scope}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            The group works with other FTSL research groups and with construction-industry stakeholders — project
            owners, contractors, consultants, associations, and government.
          </p>
          <p className="mt-4 text-sm text-muted">
            On the official FTSL page the group still uses the historic slug
            {" "}
            <span className="italic">manajemen-dan-rekayasa-konstruksi</span>
            {" "}
            ({aboutCopy.former}).
          </p>
        </article>
        <aside className="rounded-xl bg-bg-deep p-6 text-on-accent">
          <p className="text-xs uppercase tracking-[0.16em] text-on-accent/55">Faculty composition</p>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm text-on-accent/65">Listed members</dt>
              <dd className="font-display text-3xl">{faculty.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-on-accent/65">Professors</dt>
              <dd className="font-display text-3xl">{facultyStats.professors}</dd>
            </div>
            <div>
              <dt className="text-sm text-on-accent/65">Associate professors</dt>
              <dd className="font-display text-3xl">{facultyStats.associateProfessors}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-on-accent/55">
            The FTSL page cites 12 members. This directory lists staff identified on the official group pages.
          </p>
        </aside>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Laboratory</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {contactInfo.lab} supports teaching, research, and outreach in project management, construction methods,
            and construction digitalization.
          </p>
          <img src="/images/lab.jpg" alt="" className="mt-6 aspect-4/3 w-full rounded-xl object-cover" />
        </div>
        <div>
          <h2 className="font-display text-2xl">Secretariat</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {contactInfo.faculty}
            <br />
            {contactInfo.campus}
            <br />
            {contactInfo.address}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Tel. {contactInfo.phone}
            <br />
            Fax {contactInfo.fax}
            <br />
            {contactInfo.email}
          </p>
          <a
            href={contactInfo.officialPage}
            className="mt-6 inline-block text-sm font-medium text-accent"
            target="_blank"
            rel="noreferrer"
          >
            Official FTSL page
          </a>
          <a
            href={contactInfo.linkedin}
            className="mt-3 block text-sm font-medium text-accent"
            target="_blank"
            rel="noreferrer"
          >
            Group LinkedIn page
          </a>
        </div>
      </section>
    </main>
  );
}
