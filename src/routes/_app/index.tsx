import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Landmark, Users } from "lucide-react";
import { ContentPipeline } from "@/components/content-pipeline";
import { FacultyCard } from "@/components/faculty-card";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { faculty, facultyStats } from "@/data/faculty";
import { aboutCopy, contactInfo, researchAreas } from "@/data/research";
import { listPublishedNews } from "@/lib/news";

export const Route = createFileRoute("/_app/")({
  loader: () => listPublishedNews({ data: { limit: 4 } }),
  component: HomePage,
});

function HomePage() {
  const news = Route.useLoaderData();
  const featured = news[0];
  const rest = news.slice(1, 4);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-bg-deep text-on-accent">
        <img
          src="/images/hero.jpg"
          alt="CIBE building, FTSL ITB Ganesha Campus"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-r from-bg-deep via-bg-deep/80 to-bg-deep/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-on-accent/65">
            FTSL · Institut Teknologi Bandung
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {aboutCopy.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm italic text-on-accent/70 sm:text-base">
            {aboutCopy.tagline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-accent/80 sm:text-lg">
            {aboutCopy.lead} {aboutCopy.pioneer}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/news"
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-2 px-5 py-2.5 text-sm font-medium text-ink hover:bg-accent-2/90"
            >
              Read the news
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-on-accent hover:bg-white/10"
            >
              About the group
            </Link>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-on-accent hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
        {[
          { icon: Users, label: "Academic staff", value: `${facultyStats.total} faculty`, hint: `${facultyStats.professors} professors` },
          { icon: BookOpen, label: "Focus", value: "Management & engineering", hint: "From projects to field operations" },
          { icon: Landmark, label: "Home", value: "FTSL ITB", hint: contactInfo.campus },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-line bg-surface px-5 py-5 shadow-soft">
            <item.icon className="size-5 text-accent" />
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">{item.label}</p>
            <p className="mt-1 font-display text-2xl">{item.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{item.hint}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src="/images/lab.jpg"
            alt="Construction engineering and management laboratory"
            className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
          />
          <div>
            <SectionHeading kicker="About the group" title={aboutCopy.short} />
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{aboutCopy.body}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{aboutCopy.scope}</p>
            <p className="mt-4 text-sm text-muted">{aboutCopy.former}.</p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
              Full profile <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-2/70 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="Field of interest"
            title="Research areas"
            description="Construction-industry development, business performance, and field operations — through an interdisciplinary approach."
            action={
              <Link to="/research" className="text-sm font-medium text-accent">
                All areas
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <Link
                key={area.slug}
                to="/research"
                hash={area.slug}
                className="group overflow-hidden rounded-xl border border-line bg-surface shadow-soft"
              >
                <div className="aspect-16/9 overflow-hidden">
                  <img src={area.image} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{area.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker="LinkedIn → this site → FTSL"
          title="News from KK KMI"
          description="The group LinkedIn page is the source. This site holds the copy. The official FTSL page shows the same widget."
          action={
            <Link to="/widget" className="text-sm font-medium text-accent">
              Path to FTSL
            </Link>
          }
        />
        <div className="mt-8">
          <ContentPipeline compact />
        </div>
        {featured ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <NewsCard item={featured} featured />
            </div>
            <div className="grid gap-4 lg:col-span-2">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-ink-soft">No published news yet.</p>
        )}
      </section>

      <section className="bg-bg-deep py-16 text-on-accent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            invert
            kicker="Academic staff"
            title="Researchers and teachers"
            description="Faculty in construction management and construction engineering."
            action={
              <Link to="/people" className="text-sm font-medium text-on-accent/80 hover:text-on-accent">
                Faculty directory
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.slice(0, 6).map((member) => (
              <div key={member.slug} className="[&_h3]:text-ink">
                <FacultyCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
