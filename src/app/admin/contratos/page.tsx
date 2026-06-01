"use client";

import * as React from "react";
import { Download, FileText, Plus, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/sheet";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { PageHeader } from "@/components/dashboard/parts";
import { CountUp } from "@/components/ui/count-up";
import { contracts as seed, kpis } from "@/lib/demo-data";
import type { ServiceContract } from "@/lib/demo-data/types";
import { formatMXN, formatDate } from "@/lib/utils";

export default function ContratosPage() {
  const [detail, setDetail] = React.useState<ServiceContract | null>(null);

  const columns: Column<ServiceContract>[] = [
    {
      key: "cliente",
      header: "Cliente / sitio",
      sortValue: (r) => r.cliente,
      cell: (r) => (
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-secondary/10 text-secondary">
            <FileText className="size-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-medium text-on-surface">{r.cliente}</p>
            <p className="text-xs text-on-surface-variant">{r.id} · {r.sitio}</p>
          </div>
        </div>
      ),
    },
    { key: "ciudad", header: "Ciudad", sortValue: (r) => r.ciudad, cell: (r) => r.ciudad, hideOnMobile: true },
    {
      key: "guardias",
      header: "Guardias",
      sortValue: (r) => r.guardiasAsignados,
      hideOnMobile: true,
      cell: (r) => (
        <span className="inline-flex items-center gap-1 text-on-surface">
          <Users className="size-3.5 text-on-surface-variant" /> {r.guardiasAsignados}
        </span>
      ),
    },
    {
      key: "valor",
      header: "Valor mensual",
      sortValue: (r) => r.valorMensual,
      cell: (r) => <span className="tabular-nums font-medium">{formatMXN(r.valorMensual)}</span>,
    },
    { key: "status", header: "Estatus", sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} /> },
    { key: "vence", header: "Vence", sortValue: (r) => r.vence, hideOnMobile: true, cell: (r) => <span className="text-xs text-on-surface-variant">{formatDate(r.vence)}</span> },
  ];

  return (
    <div>
      <PageHeader title="Contratos" subtitle="Sitios bajo custodia y su rentabilidad.">
        <Button variant="outline" onClick={() => toast.success("Exportado", { description: "contratos.csv generado." })}>
          <Download className="size-4" /> Exportar
        </Button>
        <Button onClick={() => toast.success("Borrador creado", { description: "Nuevo contrato en negociación." })}>
          <Plus className="size-4" /> Nuevo contrato
        </Button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Contratos vigentes", value: kpis.contratosVigentes, suffix: "" },
          { label: "Guardias en campo", value: kpis.guardiasEnCampo, suffix: "" },
          { label: "Ingreso mensual", value: kpis.ingresoMensual, prefix: "$" },
          { label: "Por vencer", value: kpis.contratosPorVencer, suffix: "" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-outline-variant bg-surface p-5">
            <p className="label-meta text-on-surface-variant">{s.label}</p>
            <p className="mt-1.5 font-display text-2xl font-bold tracking-tight text-on-surface">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
          </div>
        ))}
      </div>

      <DataTable
        data={seed}
        columns={columns}
        searchKeys={["cliente", "id", "ciudad", "sitio"]}
        onRowClick={setDetail}
        pageSize={9}
      />

      <Modal open={!!detail} onClose={() => setDetail(null)} side="right">
        {detail && (
          <>
            <div className="border-b border-outline-variant px-6 py-6 pr-12">
              <span className="font-mono text-xs text-on-surface-variant">{detail.id}</span>
              <h2 className="mt-1 font-display text-xl font-bold tracking-tight">{detail.cliente}</h2>
              <div className="mt-1.5"><StatusBadge status={detail.status} /></div>
            </div>
            <div className="space-y-5 p-6">
              <div className="rounded-xl border border-outline-variant bg-primary-container p-5 text-on-primary">
                <p className="text-xs uppercase tracking-wider text-primary-fixed-dim">Valor mensual</p>
                <p className="mt-1 font-display text-3xl font-bold">{formatMXN(detail.valorMensual)}</p>
                <p className="mt-1 text-sm text-primary-fixed-dim">{detail.guardiasAsignados} guardias asignados</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Sitio", v: detail.sitio },
                  { l: "Ciudad", v: detail.ciudad },
                  { l: "Inicio", v: formatDate(detail.inicio) },
                  { l: "Vence", v: formatDate(detail.vence) },
                  { l: "Responsable", v: detail.responsable },
                ].map((r) => (
                  <div key={r.l}>
                    <p className="label-meta text-on-surface-variant">{r.l}</p>
                    <p className="mt-0.5 text-sm font-semibold text-on-surface">{r.v}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => { setDetail(null); toast.success("Contrato renovado", { description: "+12 meses agregados." }); }}>
                  Renovar contrato
                </Button>
                <Button variant="outline" onClick={() => setDetail(null)}>Cerrar</Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
