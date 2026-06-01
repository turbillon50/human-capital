"use client";

import * as React from "react";
import { CalendarClock, CalendarPlus, Check, Plane, X } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Modal, ModalHeader } from "@/components/ui/sheet";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { CountUp } from "@/components/ui/count-up";
import { formatDate, delay } from "@/lib/utils";
import type { VacationRequest, VacationStatus } from "@/lib/demo-data/types";

const seed: VacationRequest[] = [
  { id: "VAC-704", empleadoId: "EMP-1287", empleadoNombre: "Mateo Rivera", avatar: "", desde: "2026-06-18", hasta: "2026-06-24", dias: 6, status: "aprobada", motivo: "Vacaciones programadas", solicitada: "2026-05-20T10:00:00" },
  { id: "VAC-698", empleadoId: "EMP-1287", empleadoNombre: "Mateo Rivera", avatar: "", desde: "2026-04-02", hasta: "2026-04-05", dias: 3, status: "aprobada", motivo: "Asuntos personales", solicitada: "2026-03-21T09:00:00" },
  { id: "VAC-712", empleadoId: "EMP-1287", empleadoNombre: "Mateo Rivera", avatar: "", desde: "2026-07-10", hasta: "2026-07-14", dias: 4, status: "pendiente", motivo: "Viaje familiar", solicitada: "2026-05-28T14:00:00" },
];

export default function VacacionesPage() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [requests, setRequests] = React.useState(seed);

  const usados = requests.filter((r) => r.status === "aprobada").reduce((s, r) => s + r.dias, 0);
  const disponibles = 12;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const desde = String(data.get("desde"));
    const hasta = String(data.get("hasta"));
    if (!desde || !hasta) {
      toast.error("Selecciona ambas fechas");
      return;
    }
    const dias = Math.max(1, Math.round((+new Date(hasta) - +new Date(desde)) / 86400000) + 1);
    setLoading(true);
    await delay(900);
    const nueva: VacationRequest = {
      id: `VAC-${720 + requests.length}`,
      empleadoId: "EMP-1287",
      empleadoNombre: "Mateo Rivera",
      avatar: "",
      desde,
      hasta,
      dias,
      status: "pendiente" as VacationStatus,
      motivo: String(data.get("motivo") || "Asuntos personales"),
      solicitada: new Date().toISOString(),
    };
    setRequests((r) => [nueva, ...r]);
    setLoading(false);
    setOpen(false);
    toast.success("Solicitud enviada", {
      description: `${dias} día${dias > 1 ? "s" : ""} · pendiente de aprobación de tu supervisor.`,
    });
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ["#2d5dab", "#80abfe"], disableForReducedMotion: true });
  }

  return (
    <div>
      <PageHeader title="Vacaciones" subtitle="Solicita y da seguimiento a tus días de descanso.">
        <Button onClick={() => setOpen(true)}>
          <CalendarPlus className="size-4" /> Solicitar vacaciones
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Días disponibles", value: disponibles, tone: "text-secondary" },
          { label: "Días usados este año", value: usados, tone: "text-on-surface" },
          { label: "Solicitudes pendientes", value: requests.filter((r) => r.status === "pendiente").length, tone: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-outline-variant bg-surface p-5">
            <p className="label-meta text-on-surface-variant">{s.label}</p>
            <p className={`mt-1.5 font-display text-3xl font-bold tracking-tight ${s.tone}`}>
              <CountUp value={s.value} />
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SectionCard title="Mis solicitudes" bodyClassName="p-0">
          <ul className="divide-y divide-outline-variant">
            {requests.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-secondary/10 text-secondary">
                    <Plane className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {formatDate(r.desde)} – {formatDate(r.hasta)}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {r.dias} día{r.dias > 1 ? "s" : ""} · {r.motivo} · {r.id}
                    </p>
                  </div>
                </div>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Solicitar vacaciones" subtitle="Tu supervisor recibirá la solicitud para aprobación." />
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="desde">Desde</Label>
              <Input id="desde" name="desde" type="date" required defaultValue="2026-08-03" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hasta">Hasta</Label>
              <Input id="hasta" name="hasta" type="date" required defaultValue="2026-08-08" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="motivo">Motivo</Label>
            <Textarea id="motivo" name="motivo" placeholder="Describe brevemente el motivo…" />
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/5 p-3 text-xs text-on-surface-variant">
            <CalendarClock className="size-4 shrink-0 text-secondary" />
            Tienes {disponibles} días disponibles este periodo.
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              <X className="size-4" /> Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Enviando…
                </>
              ) : (
                <>
                  <Check className="size-4" /> Enviar solicitud
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
