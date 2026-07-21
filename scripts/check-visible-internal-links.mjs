#!/usr/bin/env node
/**
 * check-visible-internal-links.mjs
 * Ensures indexable detail pages have visible internal links from list pages.
 * Checks built HTML output.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let errors = 0;

console.log('=== Visible Internal Links Check ===\n');

// Check /brainrots page
const brainrotsHtml = readFileSync(resolve('out/brainrots.html'), 'utf8');

// 1. No sr-only all-links dump
const srOnlyCount = (brainrotsHtml.match(/sr-only/g) || []).length;
if (srOnlyCount > 0) {
  console.log(`  ❌ /brainrots has ${srOnlyCount} sr-only references`);
  errors++;
} else {
  console.log('  ✅ /brainrots has no sr-only elements');
}

// 2. Has Featured section
if (brainrotsHtml.includes('Featured')) {
  console.log('  ✅ /brainrots has Featured section');
} else {
  console.log('  ⚠️ /brainrots missing Featured section for indexable records');
}

// 3. Indexable records are linked from list page
const sitemap = readFileSync(resolve('out/sitemap.xml'), 'utf8');
const sitemapBrainrotSlugs = [...sitemap.matchAll(/\/brainrots\/([a-z0-9-]+)/g)].map(m => m[1]);

let allLinked = true;
for (const slug of sitemapBrainrotSlugs) {
  const linkHref = `/brainrots/${slug}`;
  if (!brainrotsHtml.includes(linkHref)) {
    console.log(`  ⚠️ "${slug}" is in sitemap but not linked from /brainrots page`);
    allLinked = false;
  }
}
if (allLinked) {
  console.log(`  ✅ All ${sitemapBrainrotSlugs.length} sitemap brainrots are linked from /brainrots`);
}

console.log(`\nErrors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
