import { useEffect, useState } from "react";
import { Check, Link2, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareButtonsProps = {
  path: string;
  title: string;
  className?: string;
};

export function ShareButtons({ path, title, className }: ShareButtonsProps) {
  const [url, setUrl] = useState(`https://cim-itb.vercel.app${path}`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const whatsappText = encodeURIComponent(`${title}\n${url}`);

  const channels = [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Share2,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${whatsappText}`,
      icon: MessageCircle,
    },
  ] as const;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore clipboard failures in restricted contexts
    }
  }

  async function nativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url, text: title });
    } catch {
      // user cancelled or share failed
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="mr-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">Share</span>
      {typeof navigator !== "undefined" && typeof navigator.share === "function" ? (
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm text-ink-soft transition-colors hover:border-accent/30 hover:text-accent"
        >
          <Share2 className="size-3.5" />
          Share
        </button>
      ) : null}
      {channels.map((channel) => (
        <a
          key={channel.label}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm text-ink-soft transition-colors hover:border-accent/30 hover:text-accent"
        >
          <channel.icon className="size-3.5" />
          {channel.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-line bg-surface px-3 text-sm text-ink-soft transition-colors hover:border-accent/30 hover:text-accent"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
