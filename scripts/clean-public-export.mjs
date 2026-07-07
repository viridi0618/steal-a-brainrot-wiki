import fs from "node:fs";
import path from "node:path";

const publicDir = path.resolve("public");

if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}

console.log("Cleaned previous public static export.");
