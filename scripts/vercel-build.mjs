import { spawnSync } from "node:child_process";

function runScript(name) {
  const command = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", `npm.cmd run ${name}`]
    : ["run", name];
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    console.error(result.error.message);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (process.env.VERCEL_ENV === "production") {
  runScript("validate:launch");
} else {
  runScript("build");
}
