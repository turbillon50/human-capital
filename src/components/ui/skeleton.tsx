import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shimmer rounded-lg bg-surface-high/70",
        className,
      )}
    />
  );
}
