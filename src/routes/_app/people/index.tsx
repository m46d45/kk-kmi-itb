import { createFileRoute } from "@tanstack/react-router";
import { FacultyCard } from "@/components/faculty-card";
import { faculty } from "@/data/faculty";

export const Route = createFileRoute("/_app/people/")({
  component: PeoplePage,
  head: () => ({
    meta: [{ title: "Faculty · KK KMI FTSL ITB" }],
  }),
});

function PeoplePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-2">Academic staff</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Research group members</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        KK KMI faculty work across project management, construction engineering, infrastructure management,
        digitalization, and risk.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faculty.map((member) => (
          <FacultyCard key={member.slug} member={member} />
        ))}
      </div>
    </main>
  );
}
