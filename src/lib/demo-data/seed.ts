/** Deterministic seeded helpers so server & client render identical demo data. */

/** mulberry32 PRNG — fast, deterministic. */
export function makeRng(seed: number) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(rng: () => number, arr: readonly T[]): T =>
  arr[Math.floor(rng() * arr.length)];

export const int = (rng: () => number, min: number, max: number): number =>
  Math.floor(rng() * (max - min + 1)) + min;

export const weighted = <T>(
  rng: () => number,
  entries: readonly [T, number][],
): T => {
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rng() * total;
  for (const [value, w] of entries) {
    r -= w;
    if (r <= 0) return value;
  }
  return entries[0][0];
};

/** Reference "now" for the demo so relative timestamps stay stable & plausible. */
export const DEMO_NOW = new Date("2026-06-01T09:30:00");

/** A date `daysAgo` before DEMO_NOW (optionally with an hour offset). */
export function daysAgoISO(daysAgo: number, hour?: number): string {
  const d = new Date(DEMO_NOW);
  d.setDate(d.getDate() - daysAgo);
  if (hour !== undefined) d.setHours(hour, Math.floor((hour * 13) % 60), 0, 0);
  return d.toISOString();
}

export function daysFromNowISO(days: number): string {
  const d = new Date(DEMO_NOW);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const nombres = [
  "Sofía",
  "Mateo",
  "Camila",
  "Diego",
  "Valentina",
  "Sebastián",
  "Isabella",
  "Joaquín",
  "Renata",
  "Lucas",
  "Emiliano",
  "Regina",
  "Santiago",
  "Ximena",
  "Leonardo",
  "Daniela",
  "Maximiliano",
  "Fernanda",
  "Andrés",
  "Mariana",
  "Rodrigo",
  "Paola",
  "Alejandro",
  "Gabriela",
] as const;

export const apellidos = [
  "Hernández",
  "Rivera",
  "García",
  "Martínez",
  "López",
  "González",
  "Ramírez",
  "Sánchez",
  "Torres",
  "Flores",
  "Gómez",
  "Vázquez",
  "Jiménez",
  "Morales",
  "Ortega",
  "Castillo",
  "Domínguez",
  "Mendoza",
  "Guerrero",
  "Cervantes",
] as const;

export const ciudades = [
  "CDMX",
  "Monterrey",
  "Guadalajara",
  "Querétaro",
  "Mérida",
  "Puebla",
  "Tijuana",
] as const;

export const empresasCliente = [
  "Plaza Antara",
  "Corporativo Reforma 222",
  "Torre Bancomer",
  "Centro Comercial Andares",
  "Parque Industrial Apodaca",
  "Hospital Ángeles",
  "Universidad del Valle",
  "Residencial Las Lomas",
  "Aeropuerto Internacional NLU",
  "Bodega Mercado Logístico",
  "Corporativo Femsa",
  "Plaza Galerías",
  "Condominios Polanco",
  "Planta Cemex",
  "Centro de Datos Kio",
  "Hotel Presidente",
] as const;

export const certificaciones = [
  "Manejo de armas (SEDENA)",
  "Primeros auxilios",
  "Defensa personal",
  "Protección civil",
  "Control de accesos",
  "Manejo de crisis",
  "Combate de incendios",
  "Escolta ejecutiva",
] as const;

export function fullName(rng: () => number): string {
  return `${pick(rng, nombres)} ${pick(rng, apellidos)} ${pick(rng, apellidos)}`;
}

/** Stable pravatar URL by integer id (1-70 available). */
export function avatarUrl(n: number): string {
  return `https://i.pravatar.cc/160?img=${(n % 70) + 1}`;
}
