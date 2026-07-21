#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadRuntimeData } from "./load-runtime-data.mjs";

const {
  published,
  siteConfig,
  noindexUtilityRoutes,
  draftDatasetHubRoutes,
} = await loadRuntimeData();
const outDir = path.resolve("out");
let errors = 0;
let robotsErrors = 0;
let canonicalErrors = 0;

function fail(message) {
  console.log(`ERROR: ${message}`);
  errors++;
}

function resolveHtml(route) {
  const clean = route === "/" ? "index" : route.replace(/^\//, "").replace(/\/$/, "");
  const candidates = [
    path.join(outDir, clean, "index.html"),
    path.join(outDir, `${clean}.html`),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function readHtml(route) {
  const file = resolveHtml(route);
  if (!file) {
    fail(`${route}: missing built HTML`);
    return null;
  }
  return fs.readFileSync(file, "utf8");
}

function robotsContent(html) {
  return html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? "";
}

function canonicalHref(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
}

function checkRecord(record, kind, indexable, sitemapLocs) {
  const route = kind === "Brainrot" ? `/brainrots/${record.slug}` : `/traits/${record.slug}`;
  const html = readHtml(route);
  if (!html) return;

  const expectedRobots = indexable ? "index, follow" : "noindex, follow";
  const actualRobots = robotsContent(html);
  if (actualRobots !== expectedRobots) {
    fail(`${route}: robots expected "${expectedRobots}", found "${actualRobots}"`);
    robotsErrors++;
  }

  const expectedCanonical = `${siteConfig.url}${route}`;
  const actualCanonical = canonicalHref(html);
  if (actualCanonical !== expectedCanonical) {
    fail(`${route}: canonical expected ${expectedCanonical}, found ${actualCanonical}`);
    canonicalErrors++;
  }

  const inSitemap = sitemapLocs.has(expectedCanonical);
  if (indexable && !inSitemap) fail(`${route}: indexable record missing from sitemap`);
  if (!indexable && inSitemap) fail(`${route}: partial record appears in sitemap`);

  if (!indexable && !html.includes("not yet passed the editorial quality gate")) {
    fail(`${route}: partial page missing editorial quality notice`);
  }
}

if (!fs.existsSync(outDir)) {
  console.log("ERROR: missing out directory. Run npm run build first.");
  process.exit(1);
}

const sitemapPath = path.join(outDir, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  console.log("ERROR: out/sitemap.xml not found. Run npm run build first.");
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, "utf8");
const sitemapLocs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));

for (const route of noindexUtilityRoutes) {
  const html = readHtml(route.href);
  if (!html) continue;
  const actualRobots = robotsContent(html);
  if (actualRobots !== "noindex, follow") {
    fail(`${route.href}: robots expected "noindex, follow", found "${actualRobots}"`);
    robotsErrors++;
  }
  if (sitemapLocs.has(`${siteConfig.url}${route.href}`)) {
    fail(`${route.href}: noindex utility route appears in sitemap`);
  }
}

for (const href of draftDatasetHubRoutes) {
  if (resolveHtml(href)) {
    fail(`${href}: empty dataset hub generated public HTML`);
  }
  if (sitemapLocs.has(`${siteConfig.url}${href}`)) {
    fail(`${href}: empty dataset hub appears in sitemap`);
  }
}

const indexableBrainrotSlugs = new Set(published.indexableBrainrots.map((record) => record.slug));
const indexableTraitSlugs = new Set(published.indexableTraits.map((record) => record.slug));

for (const record of published.visibleBrainrots) {
  checkRecord(record, "Brainrot", indexableBrainrotSlugs.has(record.slug), sitemapLocs);
}

for (const record of published.visibleTraits) {
  checkRecord(record, "Trait", indexableTraitSlugs.has(record.slug), sitemapLocs);
}

for (const record of [...published.visibleBrainrots, ...published.visibleTraits]) {
  if (record.indexingMeta.contentStatus === "hidden") {
    const route = "baseIncomeValue" in record ? `/brainrots/${record.slug}` : `/traits/${record.slug}`;
    if (resolveHtml(route)) fail(`${route}: hidden record generated public HTML`);
    if (sitemapLocs.has(`${siteConfig.url}${route}`)) fail(`${route}: hidden record appears in sitemap`);
  }
}

console.log("Robots:");
console.log(`- all complete/indexable checked: ${published.indexableBrainrots.length + published.indexableTraits.length}`);
console.log(`- all partial checked: ${published.partialBrainrots.length + published.partialTraits.length}`);
console.log(`- robots errors: ${robotsErrors}`);
console.log(`- canonical errors: ${canonicalErrors}`);
console.log(`- indexing gate errors: ${errors}`);

process.exit(errors > 0 ? 1 : 0);
