import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g);
  return tokens.map((token, index) => {
    const md = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (md) {
      return (
        <a
          key={`${md[2]}-${index}`}
          href={md[2]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-accent underline-offset-2 hover:underline"
        >
          {md[1]}
        </a>
      );
    }
    if (/^https?:\/\//.test(token)) {
      return (
        <a
          key={`${token}-${index}`}
          href={token}
          target="_blank"
          rel="noreferrer"
          className="break-all font-medium text-accent underline-offset-2 hover:underline"
        >
          {token.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={`b-${index}`} className="font-medium text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`t-${index}`}>{token}</span>;
  });
}

export function NewsBody({ body }: { body: string }) {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 24)}`}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}
