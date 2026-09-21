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

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function parseBlocks(body: string): Block[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i] ?? "";
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i += 1;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i += 1;
      continue;
    }

    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const t = (lines[i] ?? "").trim();
        const m = t.match(/^[-*]\s+(.*)$/);
        if (!m) break;
        items.push(m[1] ?? "");
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const t = (lines[i] ?? "").trim();
        const m = t.match(/^\d+\.\s+(.*)$/);
        if (!m) break;
        items.push(m[1] ?? "");
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const para: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = (lines[i] ?? "").trim();
      if (!next) break;
      if (
        next.startsWith("## ") ||
        next.startsWith("### ") ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next)
      ) {
        break;
      }
      para.push(next);
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }

  return blocks;
}

export function NewsBody({ body }: { body: string }) {
  const blocks = parseBlocks(body);

  return (
    <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={`h2-${index}`} className="font-display text-2xl text-ink">
              {renderInline(block.text)}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={`h3-${index}`} className="font-display text-xl text-ink">
              {renderInline(block.text)}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6">
              {block.items.map((item, j) => (
                <li key={`uli-${j}`}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-6">
              {block.items.map((item, j) => (
                <li key={`oli-${j}`}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        // block.type === "p"
        return <p key={`p-${index}`}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}

export const newsBodyInternals = { parseBlocks };
