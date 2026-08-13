import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  action,
  invert = false,
}: {
  kicker?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {kicker ? (
          <p
            className={cn(
              "text-[0.72rem] font-medium uppercase tracking-[0.18em]",
              invert ? "text-on-accent/55" : "text-accent-2",
            )}
          >
            {kicker}
          </p>
        ) : null}
        <h2 className={cn("mt-2 font-display text-3xl sm:text-4xl", invert ? "text-on-accent" : "text-ink")}>
          {title}
        </h2>
        {description ? (
          <p className={cn("mt-3 max-w-xl text-base leading-relaxed", invert ? "text-on-accent/70" : "text-ink-soft")}>
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
