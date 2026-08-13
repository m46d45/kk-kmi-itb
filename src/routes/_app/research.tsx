import { createFileRoute } from "@tanstack/react-router";
import { researchAreas } from "@/data/research";

export const Route = createFileRoute("/_app/research")({
  component: ResearchPage,
  head: () => ({
    meta: [{ title: "Research · KK KMI FTSL ITB" }],
  }),
});

function ResearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Field of interest</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Research areas</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        KK KMI research runs from construction-industry and business development to field operations, in
        interdisciplinary work with industry stakeholders.
      </p>
      <div className="mt-12 space-y-16">
        {researchAreas.map((area, index) => (
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
              <h2 className="mt-2 font-display text-3xl">{area.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{area.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
