import type { MetadataRoute } from "next";
import { brand } from "@/lib/design-tokens";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/como-funciona", "/precios", "/casos-de-exito", "/contacto", "/sign-in", "/sign-up"];
  const now = new Date();
  return routes.map((r) => ({
    url: `${brand.url}${r}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
