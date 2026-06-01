import {
  makeRng,
  pick,
  int,
  weighted,
  daysAgoISO,
  daysFromNowISO,
  fullName,
  avatarUrl,
  ciudades,
  empresasCliente,
  certificaciones,
  DEMO_NOW,
} from "./seed";
import type {
  Employee,
  EmployeeStatus,
  Puesto,
  Incident,
  IncidentType,
  IncidentSeverity,
  IncidentStatus,
  ServiceContract,
  ContractStatus,
  VacationRequest,
  VacationStatus,
  AppNotification,
  ActivityEvent,
  MonthlyPoint,
  Ciudad,
} from "./types";

const puestos: Puesto[] = [
  "Guardia",
  "Supervisor",
  "Jefe de Turno",
  "Escolta",
  "Monitorista C4",
  "Coordinador Operativo",
];

const zonaOf = (c: Ciudad): Employee["zona"] => {
  if (c === "Monterrey" || c === "Tijuana") return "Norte";
  if (c === "Mérida" || c === "Puebla") return "Sur";
  return "Centro";
};

// ── Employees (50) ─────────────────────────────────────────────────────────
export function buildEmployees(): Employee[] {
  const rng = makeRng(1287);
  const list: Employee[] = [];
  for (let i = 0; i < 50; i++) {
    const ciudad = pick(rng, ciudades);
    const status = weighted<EmployeeStatus>(rng, [
      ["activo", 70],
      ["vacaciones", 12],
      ["incapacidad", 8],
      ["inactivo", 10],
    ]);
    const puesto = weighted<Puesto>(rng, [
      ["Guardia", 55],
      ["Supervisor", 15],
      ["Jefe de Turno", 10],
      ["Escolta", 8],
      ["Monitorista C4", 7],
      ["Coordinador Operativo", 5],
    ]);
    const antiguedad = int(rng, 2, 96);
    const nombre = fullName(rng);
    const certs = [...certificaciones]
      .sort(() => rng() - 0.5)
      .slice(0, int(rng, 1, 4));
    const base =
      puesto === "Guardia"
        ? 9800
        : puesto === "Monitorista C4"
          ? 12500
          : puesto === "Escolta"
            ? 16000
            : puesto === "Supervisor"
              ? 18500
              : puesto === "Jefe de Turno"
                ? 21000
                : 28000;
    list.push({
      id: `EMP-${1200 + i}`,
      nombre,
      puesto,
      status,
      ciudad,
      zona: zonaOf(ciudad),
      email: `${nombre.split(" ")[0].toLowerCase()}.${nombre.split(" ")[1].toLowerCase()}@sanantonio.mx`,
      telefono: `+52 ${int(rng, 55, 81)} ${int(rng, 1000, 9999)} ${int(rng, 1000, 9999)}`,
      avatar: avatarUrl(i + 3),
      ingreso: daysAgoISO(antiguedad * 30 + int(rng, 0, 28)),
      antiguedadMeses: antiguedad,
      supervisor: fullName(makeRng(900 + (i % 9))),
      sueldoMensual: base + int(rng, -800, 2400),
      expedienteCompleto: weighted<number>(rng, [
        [100, 50],
        [90, 25],
        [75, 15],
        [60, 10],
      ]),
      contratoVence: daysFromNowISO(int(rng, -20, 320)),
      certificaciones: certs,
    });
  }
  return list;
}

// ── Incidents (200) ───────────────────────────────────────────────────────
const incidentCopy: Record<IncidentType, string[]> = {
  Retardo: ["Llegada 18 min tarde al relevo de turno", "Retardo en checada de entrada"],
  Falta: ["Inasistencia sin aviso previo", "Falta justificada por cita médica"],
  "Acta Administrativa": [
    "Incumplimiento de protocolo de uniforme",
    "Abandono temporal de puesto de vigilancia",
  ],
  "Incidente de Seguridad": [
    "Intento de acceso no autorizado contenido",
    "Activación de alarma perimetral zona C",
    "Detección de vehículo sospechoso en estacionamiento",
  ],
  Reconocimiento: [
    "Detección y reporte oportuno de fuga de gas",
    "Atención ejemplar a cliente VIP",
  ],
  "Reporte de Campo": [
    "Bitácora de ronda nocturna sin novedad",
    "Reporte de mantenimiento de cámara CCTV",
  ],
};

export function buildIncidents(employees: Employee[]): Incident[] {
  const rng = makeRng(424242);
  const list: Incident[] = [];
  for (let i = 0; i < 200; i++) {
    const emp = pick(rng, employees);
    const tipo = weighted<IncidentType>(rng, [
      ["Reporte de Campo", 30],
      ["Retardo", 22],
      ["Incidente de Seguridad", 18],
      ["Falta", 12],
      ["Reconocimiento", 10],
      ["Acta Administrativa", 8],
    ]);
    const severidad: IncidentSeverity =
      tipo === "Incidente de Seguridad" || tipo === "Acta Administrativa"
        ? weighted(rng, [
            ["alta", 50],
            ["media", 40],
            ["baja", 10],
          ])
        : tipo === "Reconocimiento"
          ? "baja"
          : weighted(rng, [
              ["baja", 55],
              ["media", 35],
              ["alta", 10],
            ]);
    const status = weighted<IncidentStatus>(rng, [
      ["resuelta", 52],
      ["en_proceso", 22],
      ["abierta", 18],
      ["cancelada", 8],
    ]);
    list.push({
      id: `INC-${4800 + i}`,
      tipo,
      empleadoId: emp.id,
      empleadoNombre: emp.nombre,
      ciudad: emp.ciudad,
      severidad,
      status,
      fecha: daysAgoISO(int(rng, 0, 60), int(rng, 6, 22)),
      descripcion: pick(rng, incidentCopy[tipo]),
      sitio: pick(rng, empresasCliente),
    });
  }
  return list.sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha));
}

// ── Service contracts / client sites (30) ────────────────────────────────────
export function buildContracts(): ServiceContract[] {
  const rng = makeRng(77123);
  const list: ServiceContract[] = [];
  for (let i = 0; i < 30; i++) {
    const cliente = empresasCliente[i % empresasCliente.length];
    const ciudad = pick(rng, ciudades);
    const status = weighted<ContractStatus>(rng, [
      ["vigente", 60],
      ["por_vencer", 18],
      ["en_negociacion", 12],
      ["vencido", 10],
    ]);
    const guardias = int(rng, 3, 28);
    list.push({
      id: `CTR-${3000 + i}`,
      cliente: `${cliente}${i >= empresasCliente.length ? " II" : ""}`,
      sitio: pick(rng, ["Acceso principal", "Perímetro", "Monitoreo C4", "Estacionamiento", "Recepción"]),
      ciudad,
      status,
      guardiasAsignados: guardias,
      valorMensual: guardias * int(rng, 14000, 19000),
      inicio: daysAgoISO(int(rng, 60, 900)),
      vence: daysFromNowISO(status === "vencido" ? -int(rng, 1, 40) : int(rng, 10, 540)),
      responsable: fullName(makeRng(500 + i)),
    });
  }
  return list;
}

// ── Vacation requests ────────────────────────────────────────────────────────
export function buildVacations(employees: Employee[]): VacationRequest[] {
  const rng = makeRng(9090);
  const motivos = [
    "Descanso familiar",
    "Asuntos personales",
    "Vacaciones programadas",
    "Trámite gubernamental",
    "Viaje familiar",
  ];
  return Array.from({ length: 15 }, (_, i) => {
    const emp = pick(rng, employees);
    const dias = int(rng, 2, 12);
    const startIn = int(rng, -10, 40);
    const status = weighted<VacationStatus>(rng, [
      ["pendiente", 45],
      ["aprobada", 42],
      ["rechazada", 13],
    ]);
    return {
      id: `VAC-${700 + i}`,
      empleadoId: emp.id,
      empleadoNombre: emp.nombre,
      avatar: emp.avatar,
      desde: daysFromNowISO(startIn),
      hasta: daysFromNowISO(startIn + dias),
      dias,
      status,
      motivo: pick(rng, motivos),
      solicitada: daysAgoISO(int(rng, 1, 20), int(rng, 8, 18)),
    };
  }).sort((a, b) => +new Date(b.solicitada) - +new Date(a.solicitada));
}

// ── Notifications ────────────────────────────────────────────────────────────
export function buildNotifications(): AppNotification[] {
  const items: Omit<AppNotification, "id" | "fecha" | "leida">[] = [
    { kind: "incidencia", titulo: "Nueva incidencia de seguridad", detalle: "Acceso no autorizado contenido en Plaza Antara." },
    { kind: "vacacion", titulo: "Solicitud de vacaciones aprobada", detalle: "Tu solicitud VAC-704 fue aprobada por tu supervisor." },
    { kind: "firma", titulo: "Documento pendiente de firma", detalle: "Contrato de renovación 2026 espera tu firma digital." },
    { kind: "contrato", titulo: "Contrato por vencer", detalle: "El contrato con Torre Bancomer vence en 12 días." },
    { kind: "sistema", titulo: "Expediente actualizado", detalle: "Se agregó tu certificación de primeros auxilios." },
    { kind: "incidencia", titulo: "Reconocimiento registrado", detalle: "Tu supervisor registró un reconocimiento por desempeño." },
    { kind: "vacacion", titulo: "Recordatorio de turno", detalle: "Tu próximo turno inicia mañana 07:00 en Corporativo Reforma 222." },
  ];
  const rng = makeRng(33333);
  return items.map((it, i) => ({
    ...it,
    id: `NTF-${100 + i}`,
    fecha: daysAgoISO(Math.floor(i / 2), int(rng, 7, 20)),
    leida: i > 3,
  }));
}

// ── Activity / audit log ─────────────────────────────────────────────────────
export function buildActivity(): ActivityEvent[] {
  const rng = makeRng(55512);
  const events: Omit<ActivityEvent, "id" | "fecha">[] = [
    { actor: "Sofía Hernández García", avatar: avatarUrl(5), accion: "aprobó la solicitud de vacaciones", objetivo: "VAC-704 · Diego Ramírez" },
    { actor: "Mateo Rivera López", avatar: avatarUrl(12), accion: "registró una nueva incidencia", objetivo: "INC-4982 · Plaza Antara" },
    { actor: "Camila Torres Flores", avatar: avatarUrl(20), accion: "actualizó el expediente de", objetivo: "EMP-1208 · Valentina Gómez" },
    { actor: "Sistema", avatar: avatarUrl(45), accion: "generó el reporte mensual de", objetivo: "Asistencia · Mayo 2026" },
    { actor: "Sofía Hernández García", avatar: avatarUrl(5), accion: "renovó el contrato con", objetivo: "CTR-3004 · Hospital Ángeles" },
    { actor: "Diego Ramírez Sánchez", avatar: avatarUrl(8), accion: "firmó digitalmente", objetivo: "Acta administrativa AA-118" },
    { actor: "Mateo Rivera López", avatar: avatarUrl(12), accion: "dio de alta a", objetivo: "EMP-1249 · Lucas Mendoza" },
    { actor: "Camila Torres Flores", avatar: avatarUrl(20), accion: "exportó el reporte de", objetivo: "Rotación de personal (CSV)" },
  ];
  return events.map((e, i) => ({
    ...e,
    id: `ACT-${200 + i}`,
    fecha: daysAgoISO(0, 20 - i) === daysAgoISO(0, 20 - i) ? minutesAgoISO(rng, i) : "",
  }));
}

function minutesAgoISO(rng: () => number, idx: number): string {
  const d = new Date(DEMO_NOW);
  d.setMinutes(d.getMinutes() - (idx * int(rng, 7, 40) + int(rng, 1, 6)));
  return d.toISOString();
}

// ── 12 months of historical data for charts ──────────────────────────────────
export function buildMonthly(): MonthlyPoint[] {
  const rng = makeRng(2026);
  const meses = ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  let empleados = 96;
  return meses.map((mes, i) => {
    empleados += int(rng, -2, 6);
    return {
      mes,
      empleados,
      incidencias: int(rng, 14, 38),
      rotacion: Number((rng() * 4 + 1.5).toFixed(1)),
      ingresos: empleados * int(rng, 31000, 38000),
      asistencia: Number((94 + rng() * 5).toFixed(1)),
    };
  });
}
