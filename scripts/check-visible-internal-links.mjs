#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadRuntimeData } from "./load-runtime-data.mjs";

const { published } = await loadRuntimeData();
let errors = 0;

function fail(message) {
  console.log(`ERROR: ${message}`);
  errors++;
}

function readOutHtml(name) {
  const candidates = [path.resolve("out", `${name}.html`), path.resolve("out", name, "index.html")];
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) {
    fail(`missing built HTML for ${name}`);
    return "";
  }
  return fs.readFileSync(file, "utf8");
}

function hrefExists(html, href) {
  return html.includes(`href="${href}"`);
}

function checkListPage({
  label,
  html,
  indexableRecords,
  partialRecords,
  routePrefix,
}) {
  if (html.includes("sr-only")) {
    fail(`${label}: contains sr-only references; mass hidden link dumps are not allowed`);
  }

  for (const record of indexableRecords) {
    const href = `${routePrefix}/${record.slug}`;
    if (!hrefExists(html, href)) {
      fail(`${label}: missing visible detail href ${href}`);
    }
  }

  for (const record of partialRecords) {
    const href = `${routePrefix}/${record.slug}`;
    if (hrefExists(html, href)) {
      fail(`${label}: partial record exposes detail href ${href}`);
    }
  }
}

const brainrotsHtml = readOutHtml("brainrots");
const traitsHtml = readOutHtml("traits");

checkListPage({
  label: "/brainrots",
  html: brainrotsHtml,
  indexableRecords: published.indexableBrainrots,
  partialRecords: published.partialBrainrots,
  routePrefix: "/brainrots",
});

checkListPage({
  label: "/traits",
  html: traitsHtml,
  indexableRecords: published.indexableTraits,
  partialRecords: published.partialTraits,
  routePrefix: "/traits",
});

console.log("Internal links:");
console.log(`- all indexable Brainrots visibly linked: ${published.indexableBrainrots.length}`);
console.log(`- all indexable Traits visibly linked: ${published.indexableTraits.length}`);
console.log("- no partial Brainrot detail links");
console.log("- no partial Trait detail links");
console.log("- no sr-only mass link dump");
console.log(`- visible link errors: ${errors}`);

process.exit(errors > 0 ? 1 : 0);
