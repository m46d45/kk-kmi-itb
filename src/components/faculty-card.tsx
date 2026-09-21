import { Link } from "@tanstack/react-router";
import type { FacultyMember } from "@/data/faculty";
import type { Locale } from "@/lib/i18n";

const roleLabel: Record<Locale, Record<FacultyMember["role"], string>> = {
  en: { Chair: "Chair", Member: "Member" },
  id: { Chair: "Ketua", Member: "Anggota" },
};

const rankLabel: Record<Locale, Record<FacultyMember["rank"], string>> = {
  en: {
    Professor: "Professor",
    "Associate Professor": "Associate Professor",
    "Assistant Professor": "Assistant Professor",
  },
  id: {
    Professor: "Profesor",
    "Associate Professor": "Lektor Kepala",
    "Assistant Professor": "Lektor",
  },
};

export function FacultyCard({ member, locale = "en" }: { member: FacultyMember; locale?: Locale }) {
  const to = locale === "id" ? "/anggota/$slug" : "/people/$slug";
  return (
    <Link
      to={to}
      params={{ slug: member.slug }}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-accent/30"
    >
      <div className="flex items-start gap-4">
        <img
          src={member.photo}
          alt=""
          className="size-16 shrink-0 rounded-lg object-cover object-top ring-1 ring-line"
        />
        <div className="min-w-0">
          <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent-2">
            {roleLabel[locale][member.role]} · {rankLabel[locale][member.rank]}
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
