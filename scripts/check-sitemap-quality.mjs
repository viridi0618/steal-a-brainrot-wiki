#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadRuntimeData } from "./load-runtime-data.mjs";

const {
  indexablePublicRoutes,
  noindexUtilityRoutes,
  draftDatasetHubRoutes,
  published,
  siteConfig,
} = await loadRuntimeData();
const sitemapPath = path.resolve("out/sitemap.xml");

if (!fs.existsSync(sitemapPath)) {
  console.log("ERROR: out/sitemap.xml not found. Run npm run build first.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const actualUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const actualSet = new Set(actualUrls);

const expectedUrls = [
  ...indexablePublicRoutes.map((route) => `${siteConfig.url}${route.href === "/" ? "" : route.href}`),
  ...published.indexableBrainrots.map((record) => `${siteConfig.url}/brainrots/${record.slug}`),
  ...published.indexableTraits.map((record) => `${siteConfig.url}/traits/${record.slug}`),
];
const expectedSet = new Set(expectedUrls);
const blockedHubUrls = new Set([
  ...noindexUtilityRoutes.map((route) => `${siteConfig.url}${route.href}`),
  ...draftDatasetHubRoutes.map((href) => `${siteConfig.url}${href}`),
]);

const duplicates = actualUrls.filter((url, index) => actualUrls.indexOf(url) !== index);
const missing = expectedUrls.filter((url) => !actualSet.has(url));
const extra = actualUrls.filter((url) => !expectedSet.has(url));
const wrongHost = actualUrls.filter((url) => !url.startsWith(siteConfig.url));
const blockedHubMatches = actualUrls.filter((url) => blockedHubUrls.has(url));

let errors = 0;
function fail(label, items) {
  if (items.length === 0) return;
  console.log(`ERROR: ${label}: ${items.length}`);
  for (const item of items) console.log(`- ${item}`);
  errors++;
}

fail("duplicate URLs", duplicates);
fail("missing URLs", missing);
fail("extra URLs", extra);
fail("wrong canonical host URLs", wrongHost);
fail("noindex or empty-dataset hub URLs", blockedHubMatches);

for (const record of [...published.partialBrainrots, ...published.partialTraits]) {
  const route = "baseIncomeValue" in record ? `/brainrots/${record.slug}` : `/traits/${record.slug}`;
  const url = `${siteConfig.url}${route}`;
  if (actualSet.has(url)) {
    console.log(`ERROR: partial record in sitemap: ${url}`);
    errors++;
  }
}

console.log("Sitemap:");
console.log(`- exact expected URL count: ${expectedUrls.length}`);
console.log(`- actual URL count: ${actualUrls.length}`);
console.log(`- missing URLs: ${missing.length}`);
console.log(`- extra URLs: ${extra.length}`);
console.log(`- duplicate URLs: ${duplicates.length}`);
console.log(`- indexable hub URLs: ${indexablePublicRoutes.length}`);
console.log(`- indexable Brainrot URLs: ${published.indexableBrainrots.length}`);
console.log(`- indexable Trait URLs: ${published.indexableTraits.length}`);

if (errors > 0) process.exit(1);
