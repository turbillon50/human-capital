import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "San Antonio HCM — El sistema operativo de tu fuerza de seguridad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #00030c 0%, #101d33 60%, #1f3a66 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <path d="M24 3 6 9v13c0 11 7.6 19.6 18 23 10.4-3.4 18-12 18-23V9L24 3Z" fill="#2d5dab" stroke="#80abfe" strokeWidth="1.4" />
            <path d="m17 24 5 5 9-10" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>SAN ANTONIO</span>
            <span style={{ fontSize: 16, letterSpacing: 6, color: "#bac7e4" }}>SEGURIDAD PRIVADA</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 22,
              color: "#80abfe",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Plataforma HCM #1 de seguridad privada
          </span>
          <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            El sistema operativo de tu fuerza de seguridad
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 22, color: "#bac7e4" }}>
          <span>● Expediente digital</span>
          <span>● Incidencias</span>
          <span>● Firma digital</span>
          <span>● Reportes</span>
        </div>
      </div>
    ),
    size,
  );
}
