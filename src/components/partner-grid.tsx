import { nationalPartners, internationalPartners, type Partner } from "@/data/partners";
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
        compact ? "text-base" : "text-xl",
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

function Group({ title, items }: { title: string; items: Partner[] }) {
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
    <div className="space-y-10">
      <Group title="National" items={nationalPartners} />
      <Group title="International" items={internationalPartners} />
    </div>
  );
}

export function PartnerStrip() {
  const all = [...nationalPartners, ...internationalPartners];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {all.map((partner) => {
        const className =
          "grid min-h-20 place-items-center rounded-xl border border-line bg-surface px-3 py-3 text-center shadow-soft";
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
