"use client";

import * as React from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { SectionHeading } from "@/components/public/section";
import { delay } from "@/lib/utils";

const contactInfo = [
  { icon: Phone, label: "Ventas", value: "+52 55 4321 8800" },
  { icon: Mail, label: "Correo", value: "ventas@sanantonio.mx" },
  { icon: MapPin, label: "Oficinas", value: "Polanco, CDMX · Monterrey · Guadalajara" },
];

export default function ContactoPage() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await delay(900);
    setLoading(false);
    setSent(true);
    toast.success("Mensaje enviado", {
      description: "Nuestro equipo te contactará en menos de 24 horas.",
    });
    confetti({
      particleCount: 70,
      spread: 65,
      origin: { y: 0.6 },
      colors: ["#2d5dab", "#80abfe", "#15803d"],
      disableForReducedMotion: true,
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos de tu operación"
        subtitle="Cuéntanos cuántos elementos manejas y en qué ciudades. Te preparamos una demo a la medida de tu empresa."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {contactInfo.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 rounded-xl border border-outline-variant bg-surface p-5"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <c.icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="label-meta text-on-surface-variant">{c.label}</p>
                <p className="font-medium text-on-surface">{c.value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl border border-outline-variant bg-primary-container p-6 text-on-primary">
            <p className="text-sm leading-relaxed text-primary-fixed-dim">
              “El 92% de nuestros prospectos cierra contrato después de ver la
              plataforma con sus propios datos.”
            </p>
            <p className="mt-3 text-sm font-semibold">Equipo Comercial · San Antonio HCM</p>
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-success-container text-on-success-container">
                <CheckCircle2 className="size-8" />
              </span>
              <h3 className="mt-4 text-xl font-semibold">¡Gracias! Mensaje recibido</h3>
              <p className="mt-2 max-w-sm text-sm text-on-surface-variant">
                Un especialista te contactará en menos de 24 horas para agendar tu
                demostración personalizada.
              </p>
              <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input id="nombre" required placeholder="Sofía Hernández" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input id="empresa" required placeholder="Escudo Norte Seguridad" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Correo corporativo</Label>
                  <Input id="email" type="email" required placeholder="sofia@empresa.mx" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="guardias">No. de elementos</Label>
                  <Input id="guardias" type="number" min={1} placeholder="120" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mensaje">¿Qué te gustaría resolver?</Label>
                <Textarea
                  id="mensaje"
                  placeholder="Queremos digitalizar expedientes y reducir rotación..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Solicitar demo <Send className="size-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-on-surface-variant">
                Al enviar aceptas nuestro aviso de privacidad. Nunca compartimos tus datos.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
