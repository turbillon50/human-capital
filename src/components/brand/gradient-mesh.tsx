import { cn } from "@/lib/utils";

/** Subtle animated gradient-mesh backdrop (security-blue / navy blobs). */
export function GradientMesh({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div
        className="mesh-blob absolute -left-24 -top-24 size-[36rem] rounded-full blur-3xl"
        style={{
          background:
            variant === "dark"
              ? "radial-gradient(circle, rgba(45,93,171,0.45), transparent 70%)"
              : "radial-gradient(circle, rgba(128,171,254,0.40), transparent 70%)",
        }}
      />
      <div
        className="mesh-blob absolute -right-32 top-12 size-[32rem] rounded-full blur-3xl"
        style={{
          animationDelay: "-6s",
          background:
            variant === "dark"
              ? "radial-gradient(circle, rgba(16,29,51,0.7), transparent 70%)"
              : "radial-gradient(circle, rgba(45,93,171,0.22), transparent 70%)",
        }}
      />
      <div
        className="mesh-blob absolute bottom-0 left-1/3 size-[28rem] rounded-full blur-3xl"
        style={{
          animationDelay: "-12s",
          background:
            variant === "dark"
              ? "radial-gradient(circle, rgba(45,93,171,0.3), transparent 70%)"
              : "radial-gradient(circle, rgba(186,199,228,0.5), transparent 70%)",
        }}
      />
    </div>
  );
}

/** Faint dot-grid overlay (from the Stitch dashboard "field map"). */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 opacity-[0.18]", className)}
      style={{
        backgroundImage: "radial-gradient(#2d5dab 0.5px, transparent 0.5px)",
        backgroundSize: "18px 18px",
      }}
      aria-hidden="true"
    />
  );
}
