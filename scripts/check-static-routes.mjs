import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const hubRoutes = [
  "/",
  "/brainrots",
  "/traits",
  "/index",
  "/best-brainrots",
  "/admin-abuse",
  "/taco-tuesday",
  "/faq",
];

const requiredFiles = [
  "index.html",
  "sitemap.xml",
  "robots.txt",
  "og-image.png",
  "favicon.ico",
];

const dynamicRoutes = [
  "/brainrots/noobini-pizzanini",
  "/traits/taco",
];

const routes = [...hubRoutes, ...dynamicRoutes];

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

  console.log(`Verified ${routes.length} routes, required files, and custom 404 behavior.`);
} finally {
  server.close();
}
