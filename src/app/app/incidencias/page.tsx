"use client";

import * as React from "react";
import { AlertTriangle, Camera, MapPin, Send, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { empresasCliente } from "@/lib/demo-data/seed";
import { delay, relativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const tipos = [
  { id: "campo", label: "Reporte de campo", desc: "Bitácora de ronda / novedad" },
  { id: "seguridad", label: "Incidente de seguridad", desc: "Acceso, alarma, sospechoso" },
  { id: "retardo", label: "Retardo / falta", desc: "Reportar a un compañero" },
  { id: "reconocimiento", label: "Reconocimiento", desc: "Buen desempeño" },
] as const;

const sevs = [
  { id: "baja", label: "Baja", tone: "neutral" as const },
  { id: "media", label: "Media", tone: "warning" as const },
  { id: "alta", label: "Alta", tone: "error" as const },
];

interface Reportada {
  tipo: string;
  sitio: string;
  severidad: string;
  fecha: string;
}

export default function ReportarIncidenciaPage() {
  const [tipo, setTipo] = React.useState<string>("campo");
  const [sev, setSev] = React.useState("baja");
  const [loading, setLoading] = React.useState(false);
  const [reportadas, setReportadas] = React.useState<Reportada[]>([
    { tipo: "Reporte de campo", sitio: "Corporativo Reforma 222", severidad: "baja", fecha: new Date(Date.now() - 3600000).toISOString() },
  ]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const sitio = String(data.get("sitio"));
    setLoading(true);
    await delay(1000);
    setReportadas((r) => [
      { tipo: tipos.find((t) => t.id === tipo)!.label, sitio, severidad: sev, fecha: new Date().toISOString() },
      ...r,
    ]);
    setLoading(false);
    (e.target as HTMLFormElement).reset();
    setSev("baja");
    toast.success("Incidencia enviada", {
      description: "Tu supervisor fue notificado y dará seguimiento.",
    });
  }

  return (
    <div>
      <PageHeader title="Reportar incidencia" subtitle="Captura novedades desde tu puesto en segundos." />

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Nueva incidencia">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label className="mb-2">Tipo de incidencia</Label>
              <div className="grid grid-cols-2 gap-2.5">
                {tipos.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTipo(t.id)}
                    className={cn(
                      "rounded-xl border p-3 text-left transition-all",
                      tipo === t.id
                        ? "border-secondary bg-secondary/5 ring-1 ring-secondary/30"
                        : "border-outline-variant hover:bg-surface-low",
                    )}
                  >
                    <p className="text-sm font-semibold text-on-surface">{t.label}</p>
                    <p className="text-xs text-on-surface-variant">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sitio">Sitio</Label>
              <select
                id="sitio"
                name="sitio"
                className="flex h-11 w-full rounded-lg border border-outline-variant bg-surface px-3.5 text-sm text-on-surface focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/15"
              >
                {empresasCliente.slice(0, 8).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <Label className="mb-2">Severidad</Label>
              <div className="flex gap-2">
                {sevs.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSev(s.id)}
                    className={cn(
                      "flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all",
                      sev === s.id
                        ? "border-secondary bg-secondary/5 text-secondary"
                        : "border-outline-variant text-on-surface-variant hover:bg-surface-low",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="desc">Descripción</Label>
              <Textarea id="desc" name="desc" required placeholder="Describe lo ocurrido con el mayor detalle posible…" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" onClick={() => toast("Adjunta evidencia desde tu cámara", { description: "Función disponible en la app móvil." })}>
                <Camera className="size-4" /> Adjuntar foto
              </Button>
              <Button type="button" variant="outline" onClick={() => toast.success("Ubicación capturada", { description: "GPS: 19.4326, -99.1332" })}>
                <MapPin className="size-4" /> Ubicación GPS
              </Button>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Enviar
                  </>
                )}
              </Button>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Reportadas hoy">
          {reportadas.length === 0 ? (
            <p className="py-8 text-center text-sm text-on-surface-variant">Aún no has reportado nada hoy.</p>
          ) : (
            <ul className="space-y-3">
              {reportadas.map((r, i) => (
                <li key={i} className="rounded-lg border border-outline-variant p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                      <ShieldAlert className="size-4 text-secondary" strokeWidth={1.75} />
                      {r.tipo}
                    </span>
                    <Badge tone={r.severidad === "alta" ? "error" : r.severidad === "media" ? "warning" : "neutral"}>
                      {r.severidad}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-xs text-on-surface-variant">
                    {r.sitio} · {relativeTime(r.fecha)}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-warning-container/40 p-3 text-xs text-on-warning-container">
            <AlertTriangle className="size-4 shrink-0" />
            En emergencias reales contacta primero a tu central de monitoreo C4.
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
