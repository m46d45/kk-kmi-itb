import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createRequire } from "node:module";

// Pure helpers re-implemented here so tests stay free of the React/server bundle.
// Keep in sync with src/lib/utils.ts, src/lib/auth/editors.ts, src/lib/embed-origin.ts,
// and src/components/news-body.tsx parseBlocks.

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function isEditorEmail(email, extraEmails = []) {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (extraEmails.length) return extraEmails.includes(normalized);
  const at = normalized.lastIndexOf("@");
  if (at < 0) return false;
  const domain = normalized.slice(at + 1);
  return domain === "itb.ac.id" || domain.endsWith(".itb.ac.id");
}

function isAllowedEmbedParentOrigin(origin) {
  try {
    const url = new URL(origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    const suffixes = ["itb.ac.id", "localhost", "127.0.0.1"];
    return suffixes.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
  } catch {
    return false;
  }
}

function parseBlocks(body) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const trimmed = (lines[i] ?? "").trim();
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
      const items = [];
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
      const items = [];
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
    const para = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = (lines[i] ?? "").trim();
      if (!next) break;
      if (next.startsWith("## ") || next.startsWith("### ") || /^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next)) break;
      para.push(next);
      i += 1;
    }
    blocks.push({ type: "p", text: para.join(" ") });
  }
  return blocks;
}

function localeFromPathname(pathname) {
  const prefixes = ["/beranda", "/tentang", "/penelitian", "/anggota", "/berita"];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? "id" : "en";
}

function switchLocalePath(pathname, target) {
  if (pathname.startsWith("/news/")) {
    const slug = pathname.slice("/news/".length);
    return target === "id" ? `/berita/${slug}` : `/news/${slug}`;
  }
  if (pathname.startsWith("/berita/")) {
    const slug = pathname.slice("/berita/".length);
    return target === "id" ? `/berita/${slug}` : `/news/${slug}`;
  }
  const map = {
    "/": { en: "/", id: "/beranda" },
    "/beranda": { en: "/", id: "/beranda" },
    "/about": { en: "/about", id: "/tentang" },
    "/tentang": { en: "/about", id: "/tentang" },
    "/news": { en: "/news", id: "/berita" },
    "/berita": { en: "/news", id: "/berita" },
  };
  return map[pathname]?.[target] ?? (target === "id" ? "/beranda" : "/");
}

describe("slugify", () => {
  it("normalizes titles into URL slugs", () => {
    assert.equal(slugify("Lean Construction Series!"), "lean-construction-series");
    assert.equal(slugify("  Hello   World  "), "hello-world");
  });
});

describe("isEditorEmail", () => {
  it("allows itb.ac.id and subdomains by default", () => {
    assert.equal(isEditorEmail("abduh@itb.ac.id"), true);
    assert.equal(isEditorEmail("x@students.itb.ac.id"), true);
    assert.equal(isEditorEmail("someone@gmail.com"), false);
  });

  it("honours an explicit allowlist when provided", () => {
    assert.equal(isEditorEmail("editor@gmail.com", ["editor@gmail.com"]), true);
    assert.equal(isEditorEmail("abduh@itb.ac.id", ["editor@gmail.com"]), false);
  });
});

describe("embed parent origin", () => {
  it("allows FTSL and local parents", () => {
    assert.equal(isAllowedEmbedParentOrigin("https://ftsl.itb.ac.id"), true);
    assert.equal(isAllowedEmbedParentOrigin("https://www.itb.ac.id"), true);
    assert.equal(isAllowedEmbedParentOrigin("http://127.0.0.1:8080"), true);
    assert.equal(isAllowedEmbedParentOrigin("https://evil.example"), false);
  });
});

describe("news body blocks", () => {
  it("parses headings and lists", () => {
    const blocks = parseBlocks("## Title\n\n- one\n- two\n\n1. a\n2. b\n\nParagraph.");
    assert.deepEqual(
      blocks.map((b) => b.type),
      ["h2", "ul", "ol", "p"],
    );
  });
});

describe("locale routing", () => {
  it("detects Indonesian paths", () => {
    assert.equal(localeFromPathname("/berita/foo"), "id");
    assert.equal(localeFromPathname("/news/foo"), "en");
  });

  it("switches EN/ID paths", () => {
    assert.equal(switchLocalePath("/about", "id"), "/tentang");
    assert.equal(switchLocalePath("/berita/x", "en"), "/news/x");
    assert.equal(switchLocalePath("/", "id"), "/beranda");
  });
});

// Silence unused import noise when tools rewrite
void createRequire;
void describe;
void it;
void assert;
