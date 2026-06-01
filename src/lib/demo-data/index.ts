import {
  buildEmployees,
  buildIncidents,
  buildContracts,
  buildVacations,
  buildNotifications,
  buildActivity,
  buildMonthly,
} from "./dataset";

export * from "./types";
export * from "./marketing";
export { avatarUrl, DEMO_NOW } from "./seed";

// Build once at module load — deterministic, so this is stable across renders.
export const employees = buildEmployees();
export const incidents = buildIncidents(employees);
export const contracts = buildContracts();
export const vacations = buildVacations(employees);
export const notifications = buildNotifications();
export const activity = buildActivity();
export const monthly = buildMonthly();

// ── Derived aggregate KPIs (used by both user & admin dashboards) ─────────────
export const kpis = {
  empleadosActivos: employees.filter((e) => e.status === "activo").length,
  totalEmpleados: employees.length,
  incapacidades: employees.filter((e) => e.status === "incapacidad").length,
  enVacaciones: employees.filter((e) => e.status === "vacaciones").length,
  vacacionesPendientes: vacations.filter((v) => v.status === "pendiente").length,
  incidenciasMes: incidents.filter(
    (i) => +new Date(i.fecha) > Date.now() - 1000 * 60 * 60 * 24 * 30,
  ).length,
  incidenciasAbiertas: incidents.filter((i) => i.status === "abierta").length,
  contratosVigentes: contracts.filter((c) => c.status === "vigente").length,
  contratosPorVencer: contracts.filter((c) => c.status === "por_vencer").length,
  ingresoMensual: contracts
    .filter((c) => c.status === "vigente" || c.status === "por_vencer")
    .reduce((s, c) => s + c.valorMensual, 0),
  guardiasEnCampo: contracts.reduce((s, c) => s + c.guardiasAsignados, 0),
};

export const zonaDistribucion = (["Norte", "Centro", "Sur"] as const).map((zona) => ({
  zona,
  total: employees.filter((e) => e.zona === zona).length,
}));
