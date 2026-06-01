import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/public/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { planes } from "@/lib/demo-data/marketing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes de San Antonio HCM por número de guardias. Caseta, Operación y Corporativo. Sin costos ocultos, soporte en español.",
};

const faqs = [
  {
    q: "¿El precio es por guardia activo?",
    a: "Sí. Pagas solo por el personal dado de alta y activo en el sistema. Las bajas no se cobran al mes siguiente.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. San Antonio HCM es 100% en la nube y la app del personal es una PWA instalable en cualquier celular, sin pasar por tiendas de apps.",
  },
  {
    q: "¿Cómo se migra mi información actual?",
    a: "Importamos tu plantilla desde Excel o tu sistema de nómina. Nuestro equipo te acompaña en el alta inicial sin costo.",
  },
  {
    q: "¿Hay permanencia forzosa?",
    a: "No. Los planes Caseta y Operación son mes a mes. El plan Corporativo se ajusta a contrato anual con descuento.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Precios transparentes"
          title="Un plan para cada tamaño de operación"
          subtitle="Sin costos de implementación ocultos. Empieza con una prueba gratuita de 14 días y escala cuando lo necesites."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {planes.map((plan, i) => (
            <Reveal key={plan.nombre} index={i}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-surface p-7 transition-all",
                  plan.destacado
                    ? "border-secondary shadow-[0_20px_50px_-24px_rgba(45,93,171,0.55)] lg:-translate-y-3"
                    : "border-outline-variant",
                )}
              >
                {plan.destacado && (
                  <Badge tone="info" className="absolute -top-3 left-7">
                    <Sparkles className="size-3" /> Más popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold tracking-tight">{plan.nombre}</h3>
                <p className="mt-1 min-h-[40px] text-sm text-on-surface-variant">{plan.resumen}</p>
                <div className="mt-5 flex items-end gap-1.5">
                  {plan.precio > 0 ? (
                    <>
                      <span className="font-display text-4xl font-extrabold tracking-tight">
                        ${plan.precio}
                      </span>
                      <span className="pb-1 text-sm text-on-surface-variant">{plan.unidad}</span>
                    </>
                  ) : (
                    <span className="font-display text-3xl font-extrabold tracking-tight">
                      A medida
                    </span>
                  )}
                </div>
                <Button
                  asChild
                  className="mt-6 w-full"
                  variant={plan.destacado ? "secondary" : "outline"}
                >
                  <Link href="/sign-up">{plan.cta}</Link>
                </Button>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-on-surface">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Todos los planes incluyen app móvil PWA, actualizaciones y respaldos diarios.
          Precios en USD facturados en MXN al tipo de cambio del día.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <SectionHeading title="Preguntas frecuentes" />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} index={i}>
              <div className="rounded-xl border border-outline-variant bg-surface p-5">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
