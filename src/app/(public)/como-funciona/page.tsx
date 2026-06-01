import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/public/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { GradientMesh } from "@/components/brand/gradient-mesh";
import { iconMap } from "@/components/icon-map";
import { howSteps, features } from "@/lib/demo-data/marketing";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "De la carpeta física al control en tiempo real en 4 pasos. Así digitaliza San Antonio HCM la gestión de tu personal de seguridad.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="relative overflow-hidden py-16">
        <GradientMesh />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Tu operación digitalizada en 4 pasos"
            subtitle="Sin instalaciones complejas ni proyectos de meses. La mayoría de nuestros clientes están operando en menos de 3 semanas."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <div className="relative space-y-6">
          {howSteps.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.numero} index={i}>
                <div className="flex flex-col gap-5 rounded-2xl border border-outline-variant bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
                  <div className="flex items-center gap-5 sm:flex-col sm:items-start">
                    <span className="font-display text-5xl font-extrabold text-secondary/20">
                      {s.numero}
                    </span>
                  </div>
                  <div className="hidden h-16 w-px bg-outline-variant sm:block" />
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon className="size-7" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{s.titulo}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-on-surface-variant">
                      {s.descripcion}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Capacidades"
          title="Todo lo que tu operación necesita"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <Reveal key={f.titulo} index={i}>
                <div className="flex gap-4 rounded-xl border border-outline-variant bg-surface p-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                  <div>
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Icon className="size-4 text-secondary" strokeWidth={1.75} />
                      {f.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                      {f.descripcion}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/sign-up">
              Solicitar demo gratis <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
