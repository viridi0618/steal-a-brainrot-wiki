const fallbackSiteUrl = "https://stealabrainrotguide.wiki";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  siteName: "Steal a Brainrot Guide",
  name: "Steal a Brainrot Guide",
  shortName: "SAB Guide",
  gameName: "Steal a Brainrot",
  description:
    "Steal a Brainrot guides, Brainrot data, Traits, Index information and event guides.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl),
  officialGameUrl:
    "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
  defaultSocialImage: "/og-image.png",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`;
}
