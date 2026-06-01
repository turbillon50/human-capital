/** Strict domain types for the San Antonio HCM demo dataset. */

export type EmployeeStatus = "activo" | "inactivo" | "vacaciones" | "incapacidad";
export type Puesto =
  | "Guardia"
  | "Supervisor"
  | "Jefe de Turno"
  | "Escolta"
  | "Monitorista C4"
  | "Coordinador Operativo";

export type Ciudad =
  | "CDMX"
  | "Monterrey"
  | "Guadalajara"
  | "Querétaro"
  | "Mérida"
  | "Puebla"
  | "Tijuana";

export interface Employee {
  id: string;
  nombre: string;
  puesto: Puesto;
  status: EmployeeStatus;
  ciudad: Ciudad;
  zona: "Norte" | "Centro" | "Sur";
  email: string;
  telefono: string;
  avatar: string;
  ingreso: string; // ISO date
  antiguedadMeses: number;
  supervisor: string;
  sueldoMensual: number; // MXN
  expedienteCompleto: number; // 0-100 %
  contratoVence: string; // ISO date
  certificaciones: string[];
}

export type IncidentType =
  | "Retardo"
  | "Falta"
  | "Acta Administrativa"
  | "Incidente de Seguridad"
  | "Reconocimiento"
  | "Reporte de Campo";
export type IncidentSeverity = "baja" | "media" | "alta";
export type IncidentStatus = "abierta" | "en_proceso" | "resuelta" | "cancelada";

export interface Incident {
  id: string;
  tipo: IncidentType;
  empleadoId: string;
  empleadoNombre: string;
  ciudad: Ciudad;
  severidad: IncidentSeverity;
  status: IncidentStatus;
  fecha: string; // ISO datetime
  descripcion: string;
  sitio: string;
}

export type ContractStatus = "vigente" | "por_vencer" | "vencido" | "en_negociacion";

/** A client site under custody — the revenue-bearing entity of the business. */
export interface ServiceContract {
  id: string;
  cliente: string;
  sitio: string;
  ciudad: Ciudad;
  status: ContractStatus;
  guardiasAsignados: number;
  valorMensual: number; // MXN
  inicio: string;
  vence: string;
  responsable: string;
}

export type VacationStatus = "pendiente" | "aprobada" | "rechazada";
export interface VacationRequest {
  id: string;
  empleadoId: string;
  empleadoNombre: string;
  avatar: string;
  desde: string;
  hasta: string;
  dias: number;
  status: VacationStatus;
  motivo: string;
  solicitada: string; // ISO datetime
}

export type NotificationKind = "incidencia" | "vacacion" | "contrato" | "sistema" | "firma";
export interface AppNotification {
  id: string;
  kind: NotificationKind;
  titulo: string;
  detalle: string;
  fecha: string; // ISO datetime
  leida: boolean;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  avatar: string;
  accion: string;
  objetivo: string;
  fecha: string; // ISO datetime
}

export interface MonthlyPoint {
  mes: string;
  empleados: number;
  incidencias: number;
  rotacion: number; // %
  ingresos: number; // MXN
  asistencia: number; // %
}

export interface DemoUser {
  id: string;
  nombre: string;
  puesto: string;
  email: string;
  avatar: string;
  rol: "usuario" | "admin";
}
