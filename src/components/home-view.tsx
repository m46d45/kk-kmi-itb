import { ArrowRight, BookOpen, Landmark, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ContentPipeline } from "@/components/content-pipeline";
import { FacultyCard } from "@/components/faculty-card";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { PartnerStrip } from "@/components/partner-grid";
import { faculty, facultyStats } from "@/data/faculty";
import { aboutCopy, contactInfo, researchAreas } from "@/data/research";
import type { NewsItem } from "@/lib/news";
import { aboutCopyId, localePaths, pages, researchAreasId, type Locale } from "@/lib/i18n";

export function HomeView({ news, locale }: { news: NewsItem[]; locale: Locale }) {
  const t = pages[locale];
  const featured = news[0];
  const rest = news.slice(1, 4);
  const paths = localePaths;
  const copy = locale === "id" ? aboutCopyId : aboutCopy;
  const name = locale === "id" ? aboutCopyId.name : aboutCopy.name;
  const tagline = locale === "id" ? aboutCopyId.tagline : aboutCopy.tagline;
  const lead = locale === "id" ? `${aboutCopyId.lead} ${aboutCopyId.pioneer}` : `${aboutCopy.lead} ${aboutCopy.pioneer}`;

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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-on-accent/65">{t.homeKicker}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{name}</h1>
          <p className="mt-4 max-w-2xl text-sm italic text-on-accent/70 sm:text-base">{tagline}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-accent/80 sm:text-lg">{lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={paths.news[locale]}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-2 px-5 py-2.5 text-sm font-medium text-ink hover:bg-accent-2/90"
            >
              {t.homeCtaNews}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to={paths.about[locale]}
              className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 py-2.5 text-sm font-medium text-on-accent hover:bg-white/10"
            >
              {t.homeCtaAbout}
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
          {
            icon: Users,
            label: t.homeStatStaff,
            value: `${facultyStats.total} ${locale === "id" ? "dosen" : "faculty"}`,
            hint: `${facultyStats.professors} ${locale === "id" ? "profesor" : "professors"}`,
          },
          {
            icon: BookOpen,
            label: t.homeStatFocus,
            value: t.homeStatFocusValue,
            hint: t.homeStatFocusHint,
          },
          {
            icon: Landmark,
            label: t.homeStatHome,
            value: "FTSL ITB",
            hint: locale === "id" ? "Kampus ITB Ganesha" : contactInfo.campus,
          },
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
            <SectionHeading kicker={t.homeAboutKicker} title={copy.short} />
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{copy.body}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{copy.scope}</p>
            <p className="mt-4 text-sm text-muted">{copy.former}.</p>
            <Link to={paths.about[locale]} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
              {t.homeAboutCta} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-2/70 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker={t.homeResearchKicker}
            title={t.homeResearchTitle}
            description={t.homeResearchDesc}
            action={
              <Link to={paths.research[locale]} className="text-sm font-medium text-accent">
                {t.homeResearchAll}
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => {
              const localized = locale === "id" ? researchAreasId[area.slug] : null;
              return (
                <Link
                  key={area.slug}
                  to={paths.research[locale]}
                  hash={area.slug}
                  className="group overflow-hidden rounded-xl border border-line bg-surface shadow-soft"
                >
                  <div className="aspect-16/9 overflow-hidden">
                    <img
                      src={area.image}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl">{localized?.title ?? area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {localized?.summary ?? area.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker={t.homeNewsKicker}
          title={t.homeNewsTitle}
          description={t.homeNewsDesc}
          action={
            <Link to="/widget" className="text-sm font-medium text-accent">
              {t.homeNewsPath}
            </Link>
          }
        />
        <div className="mt-8">
          <ContentPipeline compact />
        </div>
        {featured ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <NewsCard item={featured} featured locale={locale} />
            </div>
            <div className="grid gap-4 lg:col-span-2">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-ink-soft">{t.homeNewsEmpty}</p>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          kicker={t.homePartnersKicker}
          title={t.homePartnersTitle}
          description={t.homePartnersDesc}
          action={
            <Link to={paths.about[locale]} hash="partners" className="text-sm font-medium text-accent">
              {t.homePartnersAll}
            </Link>
          }
        />
        <div className="mt-8">
          <PartnerStrip />
        </div>
      </section>

      <section className="bg-bg-deep py-16 text-on-accent">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            invert
            kicker={t.homeFacultyKicker}
            title={t.homeFacultyTitle}
            description={t.homeFacultyDesc}
            action={
              <Link to={paths.people[locale]} className="text-sm font-medium text-on-accent/80 hover:text-on-accent">
                {t.homeFacultyAll}
              </Link>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.slice(0, 6).map((member) => (
              <div key={member.slug} className="[&_h3]:text-ink">
                <FacultyCard member={member} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
