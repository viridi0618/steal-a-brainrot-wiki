import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

function targetExists(href) {
  if (href === "/") return fs.existsSync(path.join(outDir, "index.html"));
  const clean = href.replace(/\/$/, "").replace(/^\//, "");
  return [
    path.join(outDir, clean),
    path.join(outDir, clean, "index.html"),
    path.join(outDir, `${clean}.html`),
  ].some((candidate) => fs.existsSync(candidate));
}

if (!fs.existsSync(outDir)) {
  console.error("Missing out directory. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
const canonicalUrls = new Map();
const bannedPatterns = [
  { pattern: /\sdisabled(?:=| |>)/i, label: "disabled public control" },
  { pattern: /href="#"/i, label: "placeholder href" },
  { pattern: /href=""/i, label: "empty href" },
  { pattern: /Image unavailable/i, label: "image unavailable placeholder" },
  { pattern: />\s*Confidence\s*</i, label: "public Confidence label" },
  { pattern: /Needs Review/i, label: "public Needs Review label" },
  { pattern: /Guts\s*&?\s*Blackpowder|Blackpowder/i, label: "old project reference" },
  { pattern: /鈥/i, label: "mojibake text" },
];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(outDir, file);

  for (const { pattern, label } of bannedPatterns) {
    if (pattern.test(html)) {
      failures.push(`${rel}: ${label}`);
    }
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  const title = html.match(/<title>([^<]+)<\/title>/);
  if (title && /Steal a Brainrot Guide.*Steal a Brainrot Guide/.test(title[1])) {
    failures.push(`${rel}: duplicate site name in title`);
  }

  if (canonical && rel !== "404.html" && rel !== "_not-found.html") {
    const existing = canonicalUrls.get(canonical[1]);
    if (existing) {
      failures.push(`${rel}: duplicate canonical URL also used by ${existing}`);
    } else {
      canonicalUrls.set(canonical[1], rel);
    }
  }

  const hrefs = [...html.matchAll(/\shref="([^"]*)"/g)].map((match) => match[1]);
  for (const rawHref of hrefs) {
    if (!rawHref || rawHref === "#") {
      failures.push(`${rel}: placeholder link ${rawHref || "(empty)"}`);
      continue;
    }
    if (!rawHref.startsWith("/")) continue;
    if (rawHref.startsWith("/_next/")) continue;
    const target = rawHref.split("#")[0].split("?")[0];
    if (target && !targetExists(target)) {
      failures.push(`${rel}: broken internal href ${rawHref}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Public UI checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files for public UI issues.`);
