import { builtinEditorEmails } from "@/data/editors";

/**
 * News-desk editors: signed-in users whose email is allowed to mutate news.
 *
 * Rules (first match wins):
 * 1. Explicit allowlist from `EDITOR_EMAILS` / `VITE_EDITOR_EMAILS`
 *    (comma-separated) → those emails only (plus builtins are always included).
 * 2. Builtin list in `src/data/editors.ts`.
 * 3. Otherwise → `@itb.ac.id` and `*.itb.ac.id`.
 */

function readExtraEmails(): string[] {
  const fromProcess =
    typeof process !== "undefined" ? process.env.EDITOR_EMAILS : undefined;
  const fromVite =
    typeof import.meta !== "undefined"
      ? (import.meta.env?.VITE_EDITOR_EMAILS as string | undefined)
      : undefined;
  const fromEnv = `${fromProcess ?? ""},${fromVite ?? ""}`
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...builtinEditorEmails.map((e) => e.toLowerCase()), ...fromEnv])];
}

export function isEditorEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const extra = readExtraEmails();
  if (extra.includes(normalized)) return true;
  // When only builtins are configured, still allow the ITB domain.
  const at = normalized.lastIndexOf("@");
  if (at < 0) return false;
  const domain = normalized.slice(at + 1);
  return domain === "itb.ac.id" || domain.endsWith(".itb.ac.id");
}

export class ForbiddenEditorError extends Error {
  readonly status = 403;
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenEditorError";
  }
}
