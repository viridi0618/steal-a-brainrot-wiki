import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";

const files = [
  ["src/data/sources.ts", "data/sources.mjs"],
  ["src/data/brainrots.ts", "data/brainrots.mjs"],
  ["src/data/traits.ts", "data/traits.mjs"],
  ["src/data/mutations.ts", "data/mutations.mjs"],
  ["src/lib/site-config.ts", "lib/site-config.mjs"],
  ["src/lib/route-quality.ts", "lib/route-quality.mjs"],
  ["src/lib/published-data.ts", "lib/published-data.mjs"],
  ["src/lib/data.ts", "lib/data.mjs"],
];

function rewriteImports(code) {
  return code
    .replaceAll('from "./sources"', 'from "./sources.mjs"')
    .replaceAll('from "./site-config"', 'from "./site-config.mjs"')
    .replaceAll('from "@/data/brainrots"', 'from "../data/brainrots.mjs"')
    .replaceAll('from "@/data/traits"', 'from "../data/traits.mjs"')
    .replaceAll('from "@/data/mutations"', 'from "../data/mutations.mjs"')
    .replaceAll('from "@/data/sources"', 'from "../data/sources.mjs"')
    .replaceAll('from "@/lib/route-quality"', 'from "./route-quality.mjs"')
    .replaceAll('from "@/lib/published-data"', 'from "./published-data.mjs"')
    .replaceAll('from "@/lib/site-config"', 'from "./site-config.mjs"');
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

export async function loadRuntimeData() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "sab-runtime-"));
  for (const [source, destination] of files) {
    transpileToTemp(source, destination, tempRoot);
  }

  const toUrl = (relativePath) =>
    new URL(`file:///${path.join(tempRoot, relativePath).replace(/\\/g, "/")}`).href;

  const [brainrotsModule, traitsModule, mutationsModule, routeQuality, published, dataModule] =
    await Promise.all([
      import(toUrl("data/brainrots.mjs")),
      import(toUrl("data/traits.mjs")),
      import(toUrl("data/mutations.mjs")),
      import(toUrl("lib/route-quality.mjs")),
      import(toUrl("lib/published-data.mjs")),
      import(toUrl("lib/data.mjs")),
    ]);

  return {
    brainrots: brainrotsModule.brainrots,
    traits: traitsModule.traits,
    mutations: mutationsModule.mutations,
    routeQuality,
    published,
    publicRoutes: dataModule.publicRoutes,
    indexablePublicRoutes: dataModule.indexablePublicRoutes,
    noindexUtilityRoutes: dataModule.noindexUtilityRoutes,
    siteConfig: dataModule.siteConfig,
  };
}
