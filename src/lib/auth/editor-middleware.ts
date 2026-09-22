import { createMiddleware } from "@tanstack/react-start";
import { isEditorEmail, ForbiddenEditorError } from "./editors";

/**
 * Like authMiddleware, but also requires an allowlisted editor email.
 * Use on news create / update / delete / sync server functions.
 */
export const editorMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getBearerToken } = await import("./client");
    return next({ sendContext: { bearerToken: getBearerToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { assertSameSiteRequest } = await import("./isolation.server");
    const { requireUserId, getSessionUser, authConfigured } = await import("./verify.server");
    assertSameSiteRequest();
    const userId = await requireUserId(context.bearerToken);
    if (authConfigured) {
      const user = await getSessionUser(context.bearerToken);
      if (!isEditorEmail(user?.email)) {
        throw new ForbiddenEditorError();
      }
    }
    return next({ context: { userId } });
  });
