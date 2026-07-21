#!/usr/bin/env node
import fs from "node:fs";

const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

const errors = [];

if (Object.hasOwn(vercel, "outputDirectory")) {
  errors.push("vercel.json must not set outputDirectory for native Next.js deployment.");
}

if (vercel.framework !== "nextjs") {
  errors.push('vercel.json framework must be "nextjs".');
}

if (vercel.buildCommand !== "npm run vercel-build") {
  errors.push('vercel.json buildCommand must be "npm run vercel-build".');
}

if (!packageJson.scripts["validate:launch"]) {
  errors.push("package.json must define validate:launch.");
}

const vercelBuild = fs.readFileSync("scripts/vercel-build.mjs", "utf8");
if (!vercelBuild.includes('process.env.VERCEL_ENV === "production"')) {
  errors.push("vercel-build must branch on VERCEL_ENV=production.");
}

if (!vercelBuild.includes('runScript("validate:launch")') || !vercelBuild.includes('runScript("build")')) {
  errors.push("production vercel-build must run validate:launch and build.");
}

if (errors.length > 0) {
  for (const error of errors) console.log(`ERROR: ${error}`);
  process.exit(1);
}

console.log("Deployment config verified");
