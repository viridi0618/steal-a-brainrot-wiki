import fs from "node:fs";
import path from "node:path";

for (const name of ["out", ".next"]) {
  const target = path.resolve(name);
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`Removed ${name}`);
}
