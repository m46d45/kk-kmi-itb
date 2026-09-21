import { researchAreas } from "@/data/research";
import { pages, researchAreasId, type Locale } from "@/lib/i18n";

export function ResearchView({ locale }: { locale: Locale }) {
  const t = pages[locale];
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">{t.researchKicker}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{t.researchTitle}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{t.researchLead}</p>
      <div className="mt-12 space-y-16">
        {researchAreas.map((area, index) => {
          const localized = locale === "id" ? researchAreasId[area.slug] : null;
          return (
            <article
              key={area.slug}
              id={area.slug}
              className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-2"
            >
              <img
                src={area.image}
                alt=""
                className={`aspect-16/10 w-full rounded-xl object-cover ${index % 2 ? "lg:order-2" : ""}`}
              />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">0{index + 1}</p>
                <h2 className="mt-2 font-display text-3xl">{localized?.title ?? area.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {localized?.summary ?? area.summary}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
