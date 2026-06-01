"use client";

import * as React from "react";
import { CheckCircle2, Download, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/sheet";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { PageHeader } from "@/components/dashboard/parts";
import { incidents as seed } from "@/lib/demo-data";
import type { Incident } from "@/lib/demo-data/types";
import { formatDate, relativeTime } from "@/lib/utils";

export default function AdminIncidenciasPage() {
  const [data, setData] = React.useState(seed);
  const [detail, setDetail] = React.useState<Incident | null>(null);
  const [estado, setEstado] = React.useState("todos");

  const filtered = estado === "todos" ? data : data.filter((i) => i.status === estado);

  const columns: Column<Incident>[] = [
    { key: "id", header: "Folio", sortValue: (r) => r.id, cell: (r) => <span className="font-mono text-xs">{r.id}</span>, hideOnMobile: true },
    {
      key: "tipo",
      header: "Tipo",
      sortValue: (r) => r.tipo,
      cell: (r) => (
        <div>
          <p className="font-medium text-on-surface">{r.tipo}</p>
          <p className="text-xs text-on-surface-variant">{r.empleadoNombre}</p>
        </div>
      ),
    },
    { key: "sitio", header: "Sitio", sortValue: (r) => r.sitio, cell: (r) => r.sitio, hideOnMobile: true },
    { key: "severidad", header: "Severidad", sortValue: (r) => r.severidad, cell: (r) => <StatusBadge status={r.severidad} /> },
    { key: "status", header: "Estatus", sortValue: (r) => r.status, cell: (r) => <StatusBadge status={r.status} /> },
    { key: "fecha", header: "Fecha", sortValue: (r) => r.fecha, hideOnMobile: true, cell: (r) => <span className="text-xs text-on-surface-variant">{relativeTime(r.fecha)}</span> },
  ];

  return (
    <div>
      <PageHeader title="Incidencias" subtitle={`${data.length} registros · seguimiento operativo.`}>
        <Button variant="outline" onClick={() => toast.success("Exportado", { description: "incidencias.csv generado." })}>
          <Download className="size-4" /> Exportar
        </Button>
      </PageHeader>

      <DataTable
        data={filtered}
        columns={columns}
        searchKeys={["tipo", "empleadoNombre", "sitio", "id"]}
        onRowClick={setDetail}
        selectable
        pageSize={10}
        filters={
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="h-10 rounded-lg border border-outline-variant bg-surface px-3 text-sm text-on-surface focus-visible:border-secondary focus-visible:outline-none"
          >
            <option value="todos">Todos los estatus</option>
            <option value="abierta">Abiertas</option>
            <option value="en_proceso">En proceso</option>
            <option value="resuelta">Resueltas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        }
        bulkActions={(selected, clear) => (
          <Button
            size="sm"
            onClick={() => {
              setData((d) => d.map((i) => (selected.find((s) => s.id === i.id) ? { ...i, status: "resuelta" } : i)));
              toast.success(`${selected.length} marcadas como resueltas`);
              clear();
            }}
          >
            <CheckCircle2 className="size-4" /> Marcar resueltas
          </Button>
        )}
      />

      <Modal open={!!detail} onClose={() => setDetail(null)} side="right">
        {detail && (
          <>
            <div className="border-b border-outline-variant px-6 py-6 pr-12">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-on-surface-variant">{detail.id}</span>
                <StatusBadge status={detail.status} />
              </div>
              <h2 className="mt-1.5 font-display text-xl font-bold tracking-tight">{detail.tipo}</h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-on-surface-variant">
                <MapPin className="size-4" /> {detail.sitio} · {detail.ciudad}
              </p>
            </div>
            <div className="space-y-5 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label-meta text-on-surface-variant">Reportado por</p>
                  <p className="mt-0.5 text-sm font-semibold">{detail.empleadoNombre}</p>
                </div>
                <div>
                  <p className="label-meta text-on-surface-variant">Severidad</p>
                  <div className="mt-0.5"><StatusBadge status={detail.severidad} /></div>
                </div>
                <div>
                  <p className="label-meta text-on-surface-variant">Fecha</p>
                  <p className="mt-0.5 text-sm font-semibold">{formatDate(detail.fecha)}</p>
                </div>
                <div>
                  <p className="label-meta text-on-surface-variant">Empleado</p>
                  <p className="mt-0.5 text-sm font-semibold">{detail.empleadoId}</p>
                </div>
              </div>
              <div>
                <p className="label-meta mb-1.5 text-on-surface-variant">Descripción</p>
                <p className="rounded-lg border border-outline-variant bg-surface-low p-3.5 text-sm text-on-surface">
                  {detail.descripcion}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setData((d) => d.map((i) => (i.id === detail.id ? { ...i, status: "resuelta" } : i)));
                    setDetail(null);
                    toast.success("Incidencia resuelta");
                  }}
                >
                  <CheckCircle2 className="size-4" /> Marcar resuelta
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
