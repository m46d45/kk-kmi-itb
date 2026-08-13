import { contactInfo } from "@/data/research";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    title: "LinkedIn",
    text: "Write and publish first on the Construction and Infrastructure Management page.",
  },
  {
    n: "02",
    title: "This site",
    text: "Paste the post link and text into the news desk. Home and the archive update at once.",
  },
  {
    n: "03",
    title: "FTSL ITB page",
    text: "The embed on the official faculty page pulls the same feed — no further WordPress edits.",
  },
];

export function ContentPipeline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("grid gap-3", compact ? "sm:grid-cols-3" : "md:grid-cols-3")}>
      {steps.map((step, index) => (
        <div key={step.n} className="rounded-xl border border-line bg-surface p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {step.n}
            {index < steps.length - 1 ? " →" : ""}
          </p>
          <p className="mt-2 font-display text-xl">{step.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
          {index === 0 ? (
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-medium text-accent"
            >
              Open LinkedIn
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
