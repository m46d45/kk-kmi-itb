import { Link } from "@tanstack/react-router";
import { contactInfo } from "@/data/research";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-accent-2 bg-bg-deep text-on-accent">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-on-accent/55">
            FTSL · Institut Teknologi Bandung
          </p>
          <p className="mt-3 font-display text-2xl leading-tight">
            Construction and Infrastructure Management
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-on-accent/70">
            A pioneer construction research group in Indonesia. Research, teaching, and outreach for industry and
            society.
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
          <p className="text-sm font-medium">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm text-on-accent/70">
            <li><Link to="/about" className="hover:text-on-accent">About</Link></li>
            <li><Link to="/research" className="hover:text-on-accent">Research</Link></li>
            <li><Link to="/people" className="hover:text-on-accent">Faculty</Link></li>
            <li><Link to="/news" className="hover:text-on-accent">News</Link></li>
            <li><Link to="/widget" className="hover:text-on-accent">Embed news</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm font-medium">Secretariat</p>
          <p className="mt-4 text-sm leading-relaxed text-on-accent/70">
            {contactInfo.faculty}
            <br />
            {contactInfo.campus}
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
              Official FTSL page
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
