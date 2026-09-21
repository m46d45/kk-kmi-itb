/**
 * Allowed parent origins for embed height postMessage.
 * WordPress FTSL + this app. Unknown parents still receive height only if
 * their host ends with itb.ac.id (campus pages).
 */
const ALLOWED_PARENT_HOST_SUFFIXES = ["itb.ac.id", "localhost", "127.0.0.1"];

export function isAllowedEmbedParentOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    return ALLOWED_PARENT_HOST_SUFFIXES.some(
      (suffix) => host === suffix || host.endsWith(`.${suffix}`),
    );
  } catch {
    return false;
  }
}

export function resolveEmbedPostTarget(parentOrigin: string | null): string | null {
  if (!parentOrigin || parentOrigin === "null") return null;
  return isAllowedEmbedParentOrigin(parentOrigin) ? parentOrigin : null;
}
