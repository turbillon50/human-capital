"use client";

import * as React from "react";
import { Bell, Building2, CreditCard, Palette, Settings2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader, SectionCard } from "@/components/dashboard/parts";
import { colors } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", icon: Building2 },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "pagos", label: "Pagos", icon: CreditCard },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
];

function Row({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-outline-variant py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-on-surface">{title}</p>
        <p className="text-xs text-on-surface-variant">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export default function ConfiguracionPage() {
  const [tab, setTab] = React.useState("general");
  const [accent, setAccent] = React.useState<string>(colors.secondary);
  const [density, setDensity] = React.useState(60);
  const [toggles, setToggles] = React.useState({
    twoFactor: true,
    autoBackup: true,
    geoTracking: true,
    digestEmail: false,
    incidentAlerts: true,
    contractAlerts: true,
  });

  const autosave = (label: string) => toast.success("Guardado", { description: `${label} se guardó automáticamente.` });
  const setToggle = (k: keyof typeof toggles, v: boolean) => {
    setToggles((t) => ({ ...t, [k]: v }));
    autosave("Preferencia");
  };

  return (
    <div>
      <PageHeader title="Configuración" subtitle="Ajustes de tu empresa. Los cambios se guardan automáticamente." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Vertical tabs */}
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                tab === t.id ? "bg-secondary/10 text-secondary" : "text-on-surface-variant hover:bg-surface-low",
              )}
            >
              <t.icon className="size-4" strokeWidth={1.75} /> {t.label}
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          {tab === "general" && (
            <SectionCard title="Datos de la empresa">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="razon">Razón social</Label>
                  <Input id="razon" defaultValue="San Antonio Seguridad Privada S.A. de C.V." onBlur={() => autosave("Razón social")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rfc">RFC</Label>
                  <Input id="rfc" defaultValue="SAS220101AB3" onBlur={() => autosave("RFC")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg">Registro SSP / DGSP</Label>
                  <Input id="reg" defaultValue="DGSP-CDMX-2024-1187" onBlur={() => autosave("Registro")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="zona">Zona horaria</Label>
                  <select id="zona" className="flex h-11 w-full rounded-lg border border-outline-variant bg-surface px-3.5 text-sm" onChange={() => autosave("Zona horaria")}>
                    <option>América/Ciudad de México (GMT-6)</option>
                    <option>América/Monterrey (GMT-6)</option>
                    <option>América/Tijuana (GMT-8)</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 border-t border-outline-variant pt-4">
                <Row title="Autenticación en dos pasos" desc="Obligatoria para todos los administradores">
                  <Switch checked={toggles.twoFactor} onCheckedChange={(v) => setToggle("twoFactor", v)} />
                </Row>
                <Row title="Respaldo automático diario" desc="Respaldo cifrado cada 24 horas">
                  <Switch checked={toggles.autoBackup} onCheckedChange={(v) => setToggle("autoBackup", v)} />
                </Row>
                <Row title="Geolocalización de personal" desc="Registrar ubicación en checadas de turno">
                  <Switch checked={toggles.geoTracking} onCheckedChange={(v) => setToggle("geoTracking", v)} />
                </Row>
              </div>
            </SectionCard>
          )}

          {tab === "branding" && (
            <SectionCard title="Identidad visual">
              <div className="space-y-5">
                <div>
                  <Label className="mb-2">Color de acento</Label>
                  <div className="flex flex-wrap gap-2.5">
                    {["#2d5dab", "#101d33", "#15803d", "#b45309", "#7c3aed", "#be123c"].map((c) => (
                      <button
                        key={c}
                        onClick={() => { setAccent(c); autosave("Color de acento"); }}
                        className={cn(
                          "size-10 rounded-lg ring-offset-2 ring-offset-surface transition-all",
                          accent === c ? "ring-2 ring-on-surface" : "hover:scale-110",
                        )}
                        style={{ background: c }}
                        aria-label={`Color ${c}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="dens" className="mb-2">Densidad de la interfaz · {density}%</Label>
                  <input
                    id="dens"
                    type="range"
                    min={0}
                    max={100}
                    value={density}
                    onChange={(e) => setDensity(Number(e.target.value))}
                    onMouseUp={() => autosave("Densidad")}
                    className="w-full accent-secondary"
                  />
                </div>
                <div className="rounded-xl border border-outline-variant p-5" style={{ borderColor: accent }}>
                  <p className="label-meta text-on-surface-variant">Vista previa</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg text-white" style={{ background: accent }}>
                      <Settings2 className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-on-surface">San Antonio HCM</p>
                      <p className="text-xs text-on-surface-variant">El acento se aplica a botones y enlaces.</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {tab === "pagos" && (
            <SectionCard title="Plan y facturación">
              <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">Plan Operación</p>
                    <p className="text-xs text-on-surface-variant">128 guardias activos · facturación mensual</p>
                  </div>
                  <p className="font-display text-2xl font-bold text-secondary">$4,992<span className="text-sm font-normal text-on-surface-variant"> USD/mes</span></p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <Row title="Método de pago" desc="Visa terminación 4242">
                  <Button variant="outline" size="sm" onClick={() => toast("Actualizar método de pago")}>Cambiar</Button>
                </Row>
                <Row title="Facturación automática (CFDI)" desc="Genera factura mensual con tu RFC">
                  <Switch checked onCheckedChange={() => autosave("Facturación CFDI")} />
                </Row>
                <Row title="Recibir facturas por correo" desc="Envío automático al cerrar el periodo">
                  <Switch checked onCheckedChange={() => autosave("Envío de facturas")} />
                </Row>
              </div>
            </SectionCard>
          )}

          {tab === "notificaciones" && (
            <SectionCard title="Preferencias de notificación">
              <Row title="Resumen ejecutivo por correo" desc="Cada lunes a las 8:00 AM">
                <Switch checked={toggles.digestEmail} onCheckedChange={(v) => setToggle("digestEmail", v)} />
              </Row>
              <Row title="Alertas de incidencias de severidad alta" desc="Notificación inmediata">
                <Switch checked={toggles.incidentAlerts} onCheckedChange={(v) => setToggle("incidentAlerts", v)} />
              </Row>
              <Row title="Avisos de contratos por vencer" desc="60, 30 y 7 días antes del vencimiento">
                <Switch checked={toggles.contractAlerts} onCheckedChange={(v) => setToggle("contractAlerts", v)} />
              </Row>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
