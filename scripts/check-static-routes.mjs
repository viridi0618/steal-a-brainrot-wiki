import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const hubRoutes = [
  "/",
  "/brainrots",
  "/traits",
  "/mutations",
  "/index",
  "/best-brainrots",
  "/admin-abuse",
  "/taco-tuesday",
  "/faq",
];

const requiredFiles = [
  "index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "og-image.png",
  "favicon.ico",
  "icon.png",
  "apple-touch-icon.png",
];

function read(file) {
  return fs.readFileSync(path.resolve(file), "utf8");
}

function extractSlugs(file, exportName) {
  const source = read(file);
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`Missing export ${exportName}`);
  const assignment = source.indexOf("=", start);
  const open = source.indexOf("[", assignment);
  let depth = 0;
  let array = "";
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    array += char;
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (depth === 0) break;
  }
  return [...array.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
}

const brainrotSlugs = extractSlugs("src/data/brainrots.ts", "brainrots");
const traitSlugs = extractSlugs("src/data/traits.ts", "traits");
const routes = [
  ...hubRoutes,
  ...brainrotSlugs.map((slug) => `/brainrots/${slug}`),
  ...traitSlugs.map((slug) => `/traits/${slug}`),
];

function resolveFile(urlPath) {
  const clean = urlPath === "/" ? "index" : urlPath.replace(/^\//, "").replace(/\/$/, "");
  const candidates = [
    path.join(outDir, clean, "index.html"),
    path.join(outDir, `${clean}.html`),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  const file = resolveFile(url.pathname);
  if (file) {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(file));
    return;
  }

  const notFoundFile = path.join(outDir, "404.html");
  res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
  res.end(fs.existsSync(notFoundFile) ? fs.readFileSync(notFoundFile) : "Not found");
});

if (!fs.existsSync(outDir)) {
  console.error("Missing out directory. Run npm run build first.");
  process.exit(1);
}

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;

try {
  for (const requiredFile of requiredFiles) {
    const file = path.join(outDir, requiredFile);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing generated file: out/${requiredFile}`);
    }
  }

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`);
    if (response.status !== 200) {
      throw new Error(`${route} returned ${response.status}`);
    }
  }

  const sitemap = read("out/sitemap.xml");
  const sitemapUrls = [...sitemap.matchAll(/<loc>/g)].length;
  if (sitemapUrls !== routes.length) {
    throw new Error(`Sitemap URL count expected ${routes.length}, found ${sitemapUrls}`);
  }

  const missing = await fetch(`${baseUrl}/missing-test-route`);
  const body = await missing.text();
  if (missing.status !== 404 || !body.includes("This page does not exist")) {
    throw new Error("Custom 404 route did not return the expected page.");
  }

  const invalidBrainrot = await fetch(`${baseUrl}/brainrots/not-a-real-brainrot`);
  if (invalidBrainrot.status !== 404) {
    throw new Error("Invalid Brainrot slug did not return 404.");
  }

  const invalidTrait = await fetch(`${baseUrl}/traits/gold`);
  if (invalidTrait.status !== 404) {
    throw new Error("Mutation slug exposed under /traits.");
  }

  console.log(`Verified ${routes.length} static routes, required files, sitemap, and 404 behavior.`);
} finally {
  server.close();
}
