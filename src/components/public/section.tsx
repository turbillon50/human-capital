import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-block label-meta text-secondary">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-on-surface sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal index={2}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-on-surface-variant">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
