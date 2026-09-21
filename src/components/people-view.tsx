import { FacultyCard } from "@/components/faculty-card";
import { faculty } from "@/data/faculty";
import { pages, type Locale } from "@/lib/i18n";

export function PeopleView({ locale }: { locale: Locale }) {
  const t = pages[locale];
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">{t.peopleKicker}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t.peopleTitle}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.peopleLead}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map((member) => (
          <FacultyCard key={member.slug} member={member} locale={locale} />
        ))}
      </div>
    </main>
  );
}
