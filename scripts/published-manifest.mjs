import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";

const files = [
  ["src/data/sources.ts", "data/sources.mjs"],
  ["src/data/brainrots.ts", "data/brainrots.mjs"],
  ["src/data/traits.ts", "data/traits.mjs"],
  ["src/lib/route-quality.ts", "lib/route-quality.mjs"],
  ["src/lib/published-data.ts", "lib/published-data.mjs"],
];

function rewriteImports(code) {
  return code
    .replaceAll('from "./sources"', 'from "./sources.mjs"')
    .replaceAll('from "@/data/brainrots"', 'from "../data/brainrots.mjs"')
    .replaceAll('from "@/data/traits"', 'from "../data/traits.mjs"')
    .replaceAll('from "@/lib/route-quality"', 'from "./route-quality.mjs"');
}

function transpileToTemp(sourcePath, destinationPath, tempRoot) {
  const source = fs.readFileSync(path.resolve(sourcePath), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      verbatimModuleSyntax: false,
    },
  }).outputText;
  const destination = path.join(tempRoot, destinationPath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, rewriteImports(output));
}

export async function loadPublishedManifest() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sab-published-"));
  for (const [source, destination] of files) {
    transpileToTemp(source, destination, tempRoot);
  }

  const moduleUrl = new URL(`file:///${path.join(tempRoot, "lib/published-data.mjs").replace(/\\/g, "/")}`);
  const published = await import(moduleUrl.href);

  return {
    brainrots: published.publishedBrainrots.map((record) => ({
      slug: record.slug,
      href: `/brainrots/${record.slug}`,
    })),
    traits: published.publishedTraits.map((record) => ({
      slug: record.slug,
      href: `/traits/${record.slug}`,
    })),
  };
}
