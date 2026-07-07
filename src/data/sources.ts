import type { SourceReference } from "@/lib/types";

export const checkedAt = {
  general: "2026-07-07",
  adminAbuse: "2026-07-07",
  tacoTuesday: "2026-07-07",
};

export const officialGameSource: SourceReference = {
  name: "Official Roblox game page",
  url: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
  type: "official",
  checkedAt: checkedAt.general,
};

export const brainrotsWikiSource: SourceReference = {
  name: "Steal a Brainrot Wiki - Brainrots",
  url: "https://stealabrainrot.fandom.com/wiki/Brainrots",
  type: "community-wiki",
  checkedAt: checkedAt.general,
};

export const traitsWikiSource: SourceReference = {
  name: "Steal a Brainrot Wiki - Traits",
  url: "https://stealabrainrot.fandom.com/wiki/Traits",
  type: "community-wiki",
  checkedAt: checkedAt.general,
};

export const mutationsWikiSource: SourceReference = {
  name: "Steal a Brainrot Wiki - Mutations",
  url: "https://stealabrainrot.fandom.com/wiki/Mutations",
  type: "community-wiki",
  checkedAt: checkedAt.general,
};

export const adminAbuseWikiSource: SourceReference = {
  name: "Steal a Brainrot Wiki - Admin Abuse",
  url: "https://stealabrainrot.fandom.com/wiki/Admin_Abuse",
  type: "community-wiki",
  checkedAt: checkedAt.adminAbuse,
};

export const tacoTuesdayWikiSource: SourceReference = {
  name: "Steal a Brainrot Wiki - Taco Tuesday",
  url: "https://stealabrainrot.fandom.com/wiki/Taco_Tuesday",
  type: "community-wiki",
  checkedAt: checkedAt.tacoTuesday,
};
