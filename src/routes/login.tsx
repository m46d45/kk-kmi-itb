import { Link, createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Editor sign-in · KK KMI" }],
  }),
});

function LoginPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-bg px-4 py-12 text-ink">
      <div className="w-full max-w-md rounded-xl border border-line bg-surface p-7 shadow-soft">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-2">KK KMI · FTSL ITB</p>
        <h1 className="mt-3 font-display text-3xl">Editor sign-in</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Sign in to copy LinkedIn posts onto this site. Published items appear here and in the widget on the FTSL page.
        </p>
        <div className="mt-6 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                onClick={() => signIn(provider.providerId, { callbackURL: "/admin" })}
                className="h-11 w-full rounded-md border border-line bg-bg text-sm font-medium hover:bg-surface-2"
              >
                Continue with {provider.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled in this environment.</p>
          )}
        </div>
        <Link to="/" className="mt-6 inline-block text-sm text-accent">
          Back to home
        </Link>
      </div>
    </main>
  );
}
