import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const port = Number(process.env.PORT || 4173);

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".json")) return "application/json; charset=utf-8";
  if (file.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (file.endsWith(".png")) return "image/png";
  if (file.endsWith(".ico")) return "image/x-icon";
  return "application/octet-stream";
}

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0] || "/");
  const normalized = clean === "/" ? "index" : clean.replace(/^\//, "").replace(/\/$/, "");
  const candidates = [
    path.join(outDir, normalized, "index.html"),
    path.join(outDir, `${normalized}.html`),
    path.join(outDir, normalized),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url || "/");
  if (file) {
    res.writeHead(200, { "content-type": contentType(file) });
    res.end(fs.readFileSync(file));
    return;
  }

  const notFoundFile = path.join(outDir, "404.html");
  res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
  res.end(fs.existsSync(notFoundFile) ? fs.readFileSync(notFoundFile) : "Not found");
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving out/ at http://127.0.0.1:${port}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
