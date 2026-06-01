"use client";

import * as React from "react";
import { Check, FileSignature, FileText, PenTool, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader } from "@/components/ui/sheet";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { formatDate, delay } from "@/lib/utils";

interface Doc {
  id: string;
  titulo: string;
  tipo: string;
  fecha: string;
  firmado: boolean;
}

const inicial: Doc[] = [
  { id: "DOC-2201", titulo: "Contrato de renovación 2026", tipo: "Contrato laboral", fecha: "2026-05-29", firmado: false },
  { id: "DOC-2198", titulo: "Aviso de privacidad de datos", tipo: "Aviso", fecha: "2026-05-27", firmado: false },
  { id: "DOC-2150", titulo: "Reglamento interno de trabajo", tipo: "Reglamento", fecha: "2026-04-12", firmado: true },
  { id: "DOC-2102", titulo: "Constancia de capacitación SEDENA", tipo: "Constancia", fecha: "2026-03-03", firmado: true },
];

function SignaturePad({ onChange }: { onChange: (hasInk: boolean) => void }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const drawing = React.useRef(false);

  React.useEffect(() => {
    const c = ref.current!;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    const ctx = c.getContext("2d")!;
    ctx.strokeStyle = "#101d33";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const pos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      drawing.current = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      onChange(true);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current) return;
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const up = () => (drawing.current = false);
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [onChange]);

  return (
    <canvas
      ref={ref}
      className="h-40 w-full touch-none rounded-lg border border-dashed border-outline bg-surface-low"
    />
  );
}

export default function DocumentosPage() {
  const [docs, setDocs] = React.useState(inicial);
  const [active, setActive] = React.useState<Doc | null>(null);
  const [hasInk, setHasInk] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const pendientes = docs.filter((d) => !d.firmado);
  const firmados = docs.filter((d) => d.firmado);

  async function sign() {
    if (!active) return;
    if (!hasInk) {
      toast.error("Dibuja tu firma para continuar");
      return;
    }
    setLoading(true);
    await delay(900);
    setDocs((ds) => ds.map((d) => (d.id === active.id ? { ...d, firmado: true } : d)));
    setLoading(false);
    setActive(null);
    setHasInk(false);
    toast.success("Documento firmado", { description: `${active.titulo} quedó firmado digitalmente.` });
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#2d5dab", "#80abfe", "#15803d"], disableForReducedMotion: true });
  }

  return (
    <div>
      <PageHeader title="Firmar documentos" subtitle="Revisa y firma tus documentos laborales sin papel." />

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title={`Pendientes de firma (${pendientes.length})`} bodyClassName="p-0">
          {pendientes.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <ShieldCheck className="size-10 text-success" strokeWidth={1.5} />
              <p className="mt-2 text-sm font-medium">¡Todo firmado!</p>
            </div>
          ) : (
            <ul className="divide-y divide-outline-variant">
              {pendientes.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-warning-container/50 text-on-warning-container">
                      <FileSignature className="size-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{d.titulo}</p>
                      <p className="text-xs text-on-surface-variant">
                        {d.tipo} · {formatDate(d.fecha)}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setActive(d)}>
                    <PenTool className="size-4" /> Firmar
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title={`Firmados (${firmados.length})`} bodyClassName="p-0">
          <ul className="divide-y divide-outline-variant">
            {firmados.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-success-container text-on-success-container">
                    <FileText className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{d.titulo}</p>
                    <p className="text-xs text-on-surface-variant">
                      {d.tipo} · {formatDate(d.fecha)}
                    </p>
                  </div>
                </div>
                <Badge tone="success">
                  <Check className="size-3" /> Firmado
                </Badge>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <Modal open={!!active} onClose={() => { setActive(null); setHasInk(false); }}>
        <ModalHeader title="Firma digital" subtitle={active?.titulo} />
        <div className="space-y-4 p-6">
          <div className="rounded-lg border border-outline-variant bg-surface-low p-4 text-sm text-on-surface-variant">
            <p className="font-medium text-on-surface">{active?.tipo}</p>
            <p className="mt-1 text-xs leading-relaxed">
              Al firmar manifiestas tu conformidad con el contenido del documento. La firma queda
              registrada con sello de tiempo y validez legal.
            </p>
          </div>
          <div>
            <p className="label-meta mb-2 text-on-surface-variant">Dibuja tu firma</p>
            <SignaturePad onChange={setHasInk} />
            <p className="mt-1.5 text-xs text-on-surface-variant">
              Mateo Rivera López · EMP-1287 · {formatDate(new Date())}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => { setActive(null); setHasInk(false); }}>
              Cancelar
            </Button>
            <Button onClick={sign} disabled={loading}>
              {loading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Firmando…
                </>
              ) : (
                <>
                  <PenTool className="size-4" /> Firmar documento
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
