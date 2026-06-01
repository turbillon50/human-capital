/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

export function Avatar({
  src,
  name,
  className,
  ring,
}: {
  src?: string;
  name: string;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary-container text-on-secondary-container",
        ring && "ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface",
        className ?? "h-10 w-10",
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <span className="text-xs font-semibold">{initials(name)}</span>
      )}
    </span>
  );
}
