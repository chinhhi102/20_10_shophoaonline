import { SITE } from "@/lib/site";

interface ContactLinksProps {
  variant?: "light" | "dark";
  compact?: boolean;
}

const ZALO_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.3 4.9 3.4 6.5-.1 1.3-.6 2.9-1.5 4.1 2-.3 3.9-1.1 5.1-2 .9.2 1.9.3 3 .3 5.5 0 10-3.9 10-8.7S17.5 2 12 2Zm-4.6 11.2H5.2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h1.4L4.8 9.6c-.2-.2-.1-.5.1-.7.1-.1.2-.1.3-.1h2.3c.3 0 .5.2.5.5s-.2.5-.5.5H6.3l1.8 2.6c.2.2.1.5-.1.7-.2 0-.4.1-.6.1Zm2.3-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V9.3c0-.3.2-.5.5-.5s.5.2.5.5v3.4Zm4.1 0c0 .3-.2.5-.5.5-.2 0-.3-.1-.4-.2-.3.2-.7.3-1.1.3-1.1 0-2-.9-2-2s.9-2 2-2c.4 0 .8.1 1.1.3.1-.1.2-.2.4-.2.3 0 .5.2.5.5v2.8Zm3.6.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm-5.6-3.1c-.6 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1Zm5.6 0c-.6 0-1 .5-1 1s.5 1 1 1 1-.5 1-1-.5-1-1-1Z" />
  </svg>
);

const FB_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H7.9v-2.9h2.54V9.86c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.74 8.44-4.91 8.44-9.93Z" />
  </svg>
);

const PHONE_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

/** Ba cách đặt hàng: gọi, Zalo, Facebook. Dùng chung cho hero, phần đặt hàng và footer. */
export function ContactLinks({ variant = "light", compact = false }: ContactLinksProps) {
  const dark = variant === "dark";
  const base =
    "inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium transition";
  const primary = dark
    ? "bg-rose text-white hover:bg-rose-deep"
    : "bg-rose text-white shadow-[0_14px_30px_-12px_rgba(200,83,111,0.9)] hover:bg-rose-deep";
  const secondary = dark
    ? "border border-pearl/40 text-pearl-bright hover:border-pearl hover:bg-white/5"
    : "border border-petal bg-white/70 text-ink hover:border-rose hover:bg-white";
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "" : "sm:gap-4"}`}>
      <a href={SITE.zaloUrl} target="_blank" rel="noopener" className={`${base} ${primary}`}>
        {ZALO_ICON}
        Nhắn Zalo {compact ? "" : SITE.phoneDisplay}
      </a>
      <a href={`tel:${SITE.phone}`} className={`${base} ${secondary}`}>
        {PHONE_ICON}
        Gọi {SITE.phoneDisplay}
      </a>
      <a href={SITE.facebookUrl} target="_blank" rel="noopener" className={`${base} ${secondary}`}>
        {FB_ICON}
        Facebook
      </a>
    </div>
  );
}
