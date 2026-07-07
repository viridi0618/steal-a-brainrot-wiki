import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const publicDir = path.resolve("public");

if (!fs.existsSync(outDir)) {
  console.error("Missing out directory. Run next build before syncing public output.");
  process.exit(1);
}

fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });
fs.cpSync(outDir, publicDir, { recursive: true });

console.log("Synced static export from out to public.");
