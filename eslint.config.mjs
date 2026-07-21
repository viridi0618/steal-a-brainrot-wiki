import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "public/**",
    "build/**",
    "next-env.d.ts",
    // Data files with embedded JSON objects (ESLint TS parser cannot handle inline JSON)
    "src/data/brainrots.ts",
    "src/data/traits.ts",
  ]),
]);

export default eslintConfig;
