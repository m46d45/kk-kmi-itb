import { Link } from "@tanstack/react-router";
import type { FacultyMember } from "@/data/faculty";

function initials(name: string) {
  return name
    .replace(/^Prof\.?\s|^Dr\.?\s|^Ir\.?\s/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Link
      to="/people/$slug"
      params={{ slug: member.slug }}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-accent/30"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-bg-deep font-display text-lg text-accent-2">
          {initials(member.shortName)}
        </span>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-2">
            {member.role} · {member.rank}
          </p>
          <h3 className="mt-1 font-display text-lg leading-snug text-ink group-hover:text-accent">
            {member.name}
          </h3>
        </div>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{member.interests[0]}</p>
    </Link>
  );
}
