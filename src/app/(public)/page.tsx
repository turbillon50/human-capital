import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/public/hero";
import { TrustedBy } from "@/components/public/trusted-by";
import { FeatureGrid } from "@/components/public/feature-grid";
import { StatsBand } from "@/components/public/stats-band";
import { Testimonials } from "@/components/public/testimonials";
import { CtaBand } from "@/components/public/cta-band";
import { SectionHeading } from "@/components/public/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/components/icon-map";
import { howSteps } from "@/lib/demo-data/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-12">
        <TrustedBy />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Todo en una plataforma"
          title="Diseñado para la realidad de la seguridad privada"
          subtitle="Dejamos atrás las carpetas, los WhatsApp y los Excel. Un sistema pensado para personal de campo distribuido en múltiples sitios y ciudades."
        />
        <div className="mt-12">
          <FeatureGrid />
        </div>
      </section>

      <StatsBand />

      {/* How it works (preview) */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De la carpeta física al control en tiempo real"
          subtitle="Cuatro pasos para digitalizar por completo la gestión de tu fuerza de seguridad."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.numero} index={i}>
                <div className="relative h-full rounded-2xl border border-outline-variant bg-surface p-6">
                  <span className="font-display text-5xl font-extrabold text-secondary/15">
                    {s.numero}
                  </span>
                  <Icon className="mt-2 size-7 text-secondary" strokeWidth={1.5} />
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {s.descripcion}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/como-funciona">
              Ver el proceso completo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Lo que dicen nuestros clientes"
          title="Empresas de seguridad que ya operan con datos"
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </section>

      <div className="px-4 sm:px-6">
        <CtaBand />
      </div>
    </>
  );
}
