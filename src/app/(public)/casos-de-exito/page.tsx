import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/public/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/demo-data/marketing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Casos de éxito",
  description:
    "Empresas de seguridad privada que redujeron rotación, digitalizaron expedientes y escalaron operación con San Antonio HCM.",
};

export default function CasosPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Casos de éxito"
          title="Resultados reales en operación de seguridad"
          subtitle="Empresas que cambiaron el control con papel por decisiones basadas en datos."
        />

        <div className="mt-14 space-y-8">
          {caseStudies.map((c, i) => (
            <Reveal key={c.empresa} index={i}>
              <article
                className={cn(
                  "grid items-center gap-8 rounded-2xl border border-outline-variant bg-surface p-6 sm:p-8 lg:grid-cols-2",
                  i % 2 === 1 && "lg:[&>*:first-child]:order-2",
                )}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-xl bg-primary-container font-display text-lg font-bold text-on-primary">
                      {c.logoSeed}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{c.empresa}</h3>
                      <p className="flex items-center gap-1 text-sm text-on-surface-variant">
                        <MapPin className="size-3.5" strokeWidth={1.75} /> {c.ciudad}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-relaxed">
                    <p>
                      <span className="label-meta text-error">Reto · </span>
                      <span className="text-on-surface-variant">{c.reto}</span>
                    </p>
                    <p>
                      <span className="label-meta text-success">Solución · </span>
                      <span className="text-on-surface-variant">{c.resultado}</span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {c.metricas.map((m) => (
                    <div
                      key={m.etiqueta}
                      className="rounded-xl border border-outline-variant bg-surface-low p-4 text-center"
                    >
                      <p className="font-display text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
                        {m.valor}
                      </p>
                      <p className="mt-1 text-[11px] leading-tight text-on-surface-variant">
                        {m.etiqueta}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/sign-up">
              Quiero estos resultados <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
