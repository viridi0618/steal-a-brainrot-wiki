import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const missing = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

function targetExists(href) {
  if (href === "/") return fs.existsSync(path.join(outDir, "index.html"));

  const clean = href.replace(/\/$/, "");
  const withoutSlash = clean.replace(/^\//, "");
  return [
    path.join(outDir, withoutSlash, "index.html"),
    path.join(outDir, `${withoutSlash}.html`),
  ].some((candidate) => fs.existsSync(candidate));
}

if (!fs.existsSync(outDir)) {
  console.error("Missing out directory. Run npm run build first.");
  process.exit(1);
}

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);

  for (const rawHref of hrefs) {
    // Check if it's a static asset (image, font, etc.) rather than an HTML page
    const staticExts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".json", ".xml", ".txt", ".css", ".js", ".map"];
    if (
      rawHref.startsWith("http") ||
      rawHref.startsWith("mailto:") ||
      rawHref.startsWith("tel:") ||
      rawHref.startsWith("_next/") ||
      rawHref.startsWith("/_next/") ||
      rawHref.startsWith("#") ||
      staticExts.some((ext) => rawHref.toLowerCase().endsWith(ext))
    ) {
      continue;
    }

    const urlPath = rawHref.split("#")[0].split("?")[0];
    if (!urlPath || urlPath === ".") continue;

    if (urlPath.startsWith("/") && !targetExists(urlPath)) {
      missing.push({ file: path.relative(outDir, file), href: rawHref });
    }
  }
}

if (missing.length > 0) {
  console.error("Broken internal links found:");
  for (const item of missing) {
    console.error(`- ${item.file}: ${item.href}`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. No broken internal links found.`);
