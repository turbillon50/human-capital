import type { MetadataRoute } from "next";
import { brand } from "@/lib/design-tokens";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "San Antonio HCM — Seguridad Privada",
    short_name: "San Antonio HCM",
    description:
      "Sistema operativo de capital humano para empresas de seguridad privada: expediente digital, incidencias, firma digital y reportes.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: brand.backgroundColor,
    theme_color: brand.themeColor,
    lang: "es-MX",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
