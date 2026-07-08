import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/data";
import {
  publishedBrainrots,
  publishedTraits,
} from "@/lib/published-data";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const hubRoutes = publicRoutes.map((route) => ({
    url: absoluteUrl(route.href),
    lastModified: new Date("2026-07-08"),
    changeFrequency: route.href === "/" ? "weekly" as const : "monthly" as const,
    priority: route.priority,
  }));

  const brainrotRoutes = publishedBrainrots
    .map((brainrot) => ({
      url: absoluteUrl(`/brainrots/${brainrot.slug}`),
      lastModified: new Date(brainrot.updatedAt || brainrot.verifiedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const traitRoutes = publishedTraits
    .map((trait) => ({
      url: absoluteUrl(`/traits/${trait.slug}`),
      lastModified: new Date(trait.updatedAt || trait.verifiedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...hubRoutes, ...brainrotRoutes, ...traitRoutes];
}
