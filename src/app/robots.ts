import type { MetadataRoute } from "next";
import { brand } from "@/lib/design-tokens";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/app/", "/admin/"] },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
