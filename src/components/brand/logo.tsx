import { cn } from "@/lib/utils";

/** San Antonio shield emblem — custom SVG (brushed-steel navy shield). */
export function ShieldMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="sa-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2d5dab" />
          <stop offset="1" stopColor="#101d33" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 6 9v13c0 11 7.6 19.6 18 23 10.4-3.4 18-12 18-23V9L24 3Z"
        fill="url(#sa-shield)"
        stroke="#80abfe"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <path
        d="M24 11v26c-6.6-2.4-11-8-11-15v-7l11-4Z"
        fill="#ffffff"
        fillOpacity="0.08"
      />
      <path
        d="m17 24 5 5 9-10"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
  compact = false,
}: {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <ShieldMark className="size-8 drop-shadow-sm" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "text-[15px] font-bold tracking-tight",
              inverted ? "text-on-primary" : "text-on-surface",
            )}
          >
            SAN ANTONIO
          </span>
          <span
            className={cn(
              "text-[9px] font-semibold uppercase tracking-[0.22em]",
              inverted ? "text-primary-fixed-dim" : "text-on-surface-variant",
            )}
          >
            Seguridad Privada
          </span>
        </span>
      )}
    </span>
  );
}
