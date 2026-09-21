import { Link, useRouterState } from "@tanstack/react-router";
import { contactInfo } from "@/data/research";
import { localeFromPathname, localePaths, ui } from "@/lib/i18n";

export function SiteFooter() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const locale = localeFromPathname(pathname);
  const t = ui[locale];
  const paths = localePaths;

  return (
    <footer className="mt-20 border-t-2 border-accent-2 bg-bg-deep text-on-accent">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-on-accent/55">
            FTSL · Institut Teknologi Bandung
          </p>
          <p className="mt-3 font-display text-2xl leading-tight">
            {locale === "id"
              ? "Konstruksi dan Manajemen Infrastruktur"
              : "Construction and Infrastructure Management"}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-on-accent/70">
            {locale === "id"
              ? "Pelopor kelompok penelitian konstruksi di Indonesia. Penelitian, pengajaran, dan pengabdian untuk industri dan masyarakat."
              : "A pioneer construction research group in Indonesia. Research, teaching, and outreach for industry and society."}
          </p>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm text-on-accent/80 hover:text-on-accent"
          >
            LinkedIn · Construction and Infrastructure Management
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-medium">{t.footerNavigate}</p>
          <ul className="mt-4 space-y-2 text-sm text-on-accent/70">
            <li>
              <Link to={paths.about[locale]} className="hover:text-on-accent">
                {t.navAbout}
              </Link>
            </li>
            <li>
              <Link to={paths.about[locale]} hash="partners" className="hover:text-on-accent">
                {t.footerPartners}
              </Link>
            </li>
            <li>
              <Link to={paths.research[locale]} className="hover:text-on-accent">
                {t.navResearch}
              </Link>
            </li>
            <li>
              <Link to={paths.people[locale]} className="hover:text-on-accent">
                {t.navPeople}
              </Link>
            </li>
            <li>
              <Link to={paths.news[locale]} className="hover:text-on-accent">
                {t.navNews}
              </Link>
            </li>
            <li>
              <Link to="/widget" className="hover:text-on-accent">
                {t.footerEmbed}
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm font-medium">{t.footerSecretariat}</p>
          <p className="mt-4 text-sm leading-relaxed text-on-accent/70">
            {locale === "id" ? "Fakultas Teknik Sipil dan Lingkungan" : contactInfo.faculty}
            <br />
            {locale === "id" ? "Kampus ITB Ganesha" : contactInfo.campus}
            <br />
            {contactInfo.address}
          </p>
          <p className="mt-4 text-sm text-on-accent/70">
            Tel. {contactInfo.phone}
            <br />
            Fax {contactInfo.fax}
            <br />
            {contactInfo.email}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-on-accent/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} KK KMI · FTSL ITB</p>
          <div className="flex flex-wrap gap-4">
            <a href={contactInfo.officialPage} className="hover:text-on-accent" target="_blank" rel="noreferrer">
              {t.footerOfficial}
            </a>
            <a href={contactInfo.linkedin} className="hover:text-on-accent" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
