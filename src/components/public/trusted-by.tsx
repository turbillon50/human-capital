import { trustedBrands } from "@/lib/demo-data/marketing";

/** Placeholder client wordmarks rendered as elegant SVG-ish text marks. */
export function TrustedBy() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <p className="text-center label-meta text-on-surface-variant">
        La confianza de 500+ empresas de seguridad
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-70">
        {trustedBrands.map((b) => (
          <span
            key={b}
            className="select-none text-base font-bold uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:text-on-surface"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
