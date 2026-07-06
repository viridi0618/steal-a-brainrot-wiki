import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date("2026-07-06"),
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
