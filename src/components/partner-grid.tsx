import {
  collaborations,
  nationalPartners,
  internationalPartners,
  type Partner,
} from "@/data/partners";
import { cn } from "@/lib/utils";

function PartnerMark({ partner, compact = false }: { partner: Partner; compact?: boolean }) {
  if (partner.logo) {
    return (
      <img
        src={partner.logo}
        alt=""
        className={cn("w-auto max-w-full object-contain", compact ? "max-h-12" : "max-h-14")}
      />
    );
  }
  return (
    <span
      className={cn(
        "font-display font-medium leading-tight text-accent",
        compact ? "text-base" : "text-2xl",
      )}
    >
      {partner.name}
    </span>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  const inner = (
    <>
      <span className="grid h-16 place-items-center">
        <PartnerMark partner={partner} />
      </span>
      {partner.logo ? (
        <>
          <span className="mt-3 block text-sm font-medium leading-snug text-ink">{partner.name}</span>
          <span className="mt-1 block text-xs leading-snug text-muted">{partner.short}</span>
        </>
      ) : (
        <span className="mt-3 block text-xs leading-snug text-muted">{partner.short}</span>
      )}
    </>
  );

  const className =
    "flex h-full flex-col rounded-xl border border-line bg-surface px-4 py-4 shadow-soft transition-colors";

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noreferrer"
        className={cn(className, "hover:border-accent/30")}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function CollaborationCard({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-accent/25 bg-surface p-6 shadow-soft transition-colors hover:border-accent/50 sm:p-8"
    >
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent-2">
        Collaboration · Alliance
      </p>
      <div className="mt-4 flex items-start gap-4">
        <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-surface-2 ring-1 ring-line">
          <PartnerMark partner={partner} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-ink group-hover:text-accent sm:text-3xl">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{partner.short}</p>
        </div>
      </div>
      {partner.narrative ? (
        <p className="mt-5 text-sm leading-relaxed text-ink-soft sm:text-base">{partner.narrative}</p>
      ) : null}
      <span className="mt-6 text-sm font-medium text-accent">Visit website →</span>
    </a>
  );
}

function Group({ title, items }: { title: string; items: Partner[] }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-accent-2">{title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((partner) => (
          <PartnerCard key={partner.slug} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export function PartnerGrid() {
  return (
    <div className="space-y-12">
      {collaborations.length ? (
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-accent-2">
            Collaborations & alliances
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Formal research and professional alliances the group works with closely.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {collaborations.map((partner) => (
              <CollaborationCard key={partner.slug} partner={partner} />
            ))}
          </div>
        </div>
      ) : null}
      <Group title="National partners" items={nationalPartners} />
      <Group title="International partners" items={internationalPartners} />
    </div>
  );
}

export function PartnerStrip() {
  const all = [...collaborations, ...nationalPartners, ...internationalPartners];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {all.map((partner) => {
        const className = cn(
          "grid min-h-20 place-items-center rounded-xl border bg-surface px-3 py-3 text-center shadow-soft",
          partner.kind === "collaboration" ? "border-accent/30" : "border-line",
        );
        const mark = <PartnerMark partner={partner} compact />;
        if (partner.href) {
          return (
            <a
              key={partner.slug}
              href={partner.href}
              target="_blank"
              rel="noreferrer"
              className={cn(className, "hover:border-accent/30")}
              title={partner.name}
            >
              {mark}
            </a>
          );
        }
        return (
          <div key={partner.slug} className={className} title={partner.name}>
            {mark}
          </div>
        );
      })}
    </div>
  );
}
