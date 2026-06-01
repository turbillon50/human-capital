/**
 * Design tokens — single source of truth for the "San Antonio Operational
 * Standard". Migrated 1:1 from the Google Stitch Material 3 export
 * (see /STITCH_ANALYSIS.md). The CSS-variable theme in app/globals.css mirrors
 * these values; this file is consumed by TS/JS that needs the raw hex codes
 * (charts, canvas effects, OG images, manifest theme color, etc.).
 */

export const colors = {
  // Surfaces (light)
  background: "#f7f9fb",
  surface: "#ffffff",
  surfaceLow: "#f2f4f6",
  surfaceContainer: "#eceef0",
  surfaceHigh: "#e6e8ea",
  surfaceHighest: "#e0e3e5",
  onSurface: "#191c1e",
  onSurfaceVariant: "#45474d",
  outline: "#75777e",
  outlineVariant: "#c5c6cd",

  // Brand
  primary: "#00030c",
  primaryContainer: "#101d33",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#7985a0",
  primaryFixedDim: "#bac7e4",

  secondary: "#2d5dab",
  secondaryContainer: "#80abfe",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#003d85",

  // Functional
  success: "#15803d",
  warning: "#b45309",
  error: "#ba1a1a",
} as const;

/** Ordered palette for charts (recharts series, donut slices, etc.). */
export const chartPalette = [
  "#2d5dab", // security blue
  "#101d33", // navy
  "#80abfe", // light blue
  "#15803d", // success
  "#b45309", // warning
  "#7985a0", // steel
  "#ba1a1a", // error
] as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  gutter: "20px",
  containerMax: "1440px",
} as const;

export const radius = {
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
} as const;

export const shadows = {
  // "Industrial" — tight, low-blur, neutral (per Stitch DESIGN.md)
  card: "0 1px 2px 0 rgba(16, 29, 51, 0.04)",
  hover: "0 10px 20px -8px rgba(16, 29, 51, 0.18)",
  modal: "0 24px 48px -12px rgba(16, 29, 51, 0.32)",
} as const;

export const typeScale = {
  displayLg: { size: "32px", weight: 700, tracking: "-0.02em" },
  headlineMd: { size: "24px", weight: 600, tracking: "-0.01em" },
  titleLg: { size: "20px", weight: 600 },
  bodyMd: { size: "16px", weight: 400 },
  bodySm: { size: "14px", weight: 400 },
  labelMd: { size: "12px", weight: 600, tracking: "0.05em" },
  labelSm: { size: "11px", weight: 500 },
} as const;

/** Brand metadata reused across manifest / SEO / OG images. */
export const brand = {
  name: "San Antonio HCM",
  legalName: "San Antonio Seguridad Privada",
  tagline: "El sistema operativo de tu fuerza de seguridad",
  themeColor: "#101d33",
  backgroundColor: "#f7f9fb",
  url: "https://san-antonio-hcm-demo.vercel.app",
} as const;
