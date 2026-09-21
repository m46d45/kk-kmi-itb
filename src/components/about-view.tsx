import { PartnerGrid } from "@/components/partner-grid";
import { SectionHeading } from "@/components/section-heading";
import { faculty } from "@/data/faculty";
import { aboutCopy, contactInfo } from "@/data/research";
import { aboutCopyId, pages, type Locale } from "@/lib/i18n";

export function AboutView({ locale }: { locale: Locale }) {
  const t = pages[locale];
  const copy = locale === "id" ? aboutCopyId : aboutCopy;
  const title = locale === "id" ? aboutCopyId.name : aboutCopy.name;
  const subtitle = locale === "id" ? aboutCopyId.english : aboutCopy.indonesian;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">{t.aboutKicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-3 text-lg italic text-ink-soft">{subtitle}</p>
      <p className="mt-4 max-w-3xl text-base text-ink-soft">{copy.tagline}</p>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft">{copy.body}</p>

      <div className="mt-10 overflow-hidden rounded-xl">
        <img
          src="/images/cibe.jpg"
          alt="CIBE building, FTSL ITB Ganesha Campus"
          className="aspect-21/9 w-full object-cover object-[50%_35%]"
        />
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="rounded-xl border border-line bg-surface p-6 shadow-soft lg:col-span-2">
          <h2 className="font-display text-2xl">{t.aboutRole}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{copy.pioneer}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{copy.scope}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{t.aboutStakeholders}</p>
          <p className="mt-4 text-sm text-muted">
            {t.aboutFormerPrefix}{" "}
            <span className="italic">manajemen-dan-rekayasa-konstruksi</span> ({copy.former}).
          </p>
        </article>
        <aside className="rounded-xl bg-bg-deep p-6 text-on-accent">
          <p className="text-xs uppercase tracking-[0.16em] text-on-accent/55">{t.aboutStudents}</p>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm text-on-accent/65">{t.aboutFacultyCount}</dt>
              <dd className="font-display text-3xl">{faculty.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-on-accent/65">{t.aboutUndergrad}</dt>
              <dd className="font-display text-3xl">25</dd>
              <dd className="mt-1 text-xs leading-relaxed text-on-accent/55">{t.aboutUndergradHint}</dd>
            </div>
            <div>
              <dt className="text-sm text-on-accent/65">{t.aboutMasters}</dt>
              <dd className="font-display text-3xl">30</dd>
            </div>
            <div>
              <dt className="text-sm text-on-accent/65">{t.aboutDoctoral}</dt>
              <dd className="font-display text-3xl">8</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">{t.aboutLab}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {contactInfo.lab} {t.aboutLabBody}
          </p>
          <img src="/images/lab.jpg" alt="" className="mt-6 aspect-4/3 w-full rounded-xl object-cover" />
        </div>
        <div>
          <h2 className="font-display text-2xl">{t.aboutSecretariat}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            {locale === "id" ? "Fakultas Teknik Sipil dan Lingkungan" : contactInfo.faculty}
            <br />
            {locale === "id" ? "Kampus ITB Ganesha" : contactInfo.campus}
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
            {locale === "id" ? "Laman resmi FTSL" : "Official FTSL page"}
          </a>
          <a
            href={contactInfo.linkedin}
            className="mt-3 block text-sm font-medium text-accent"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </section>

      <section id="partners" className="mt-16">
        <SectionHeading kicker={t.aboutPartnersKicker} title={t.aboutPartnersTitle} description={t.aboutPartnersDesc} />
        <div className="mt-10">
          <PartnerGrid />
        </div>
      </section>
    </main>
  );
}
