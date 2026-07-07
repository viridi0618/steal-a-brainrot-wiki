import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const nodeCommand = process.execPath;
const npxCommand = "npx";

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const actualCommand = isWindows && command === "npx" ? "cmd.exe" : command;
    const actualArgs = isWindows && command === "npx" ? ["/d", "/s", "/c", "npx.cmd", ...args] : args;
    const child = spawn(actualCommand, actualArgs, {
      stdio: "inherit",
      shell: false,
      ...options,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch("http://127.0.0.1:4173/");
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Timed out waiting for static out/ server.");
}

const server = spawn(nodeCommand, ["scripts/serve-out.mjs"], {
  stdio: "inherit",
  shell: false,
});

try {
  await waitForServer();
  await run(npxCommand, ["playwright", "test", "--workers=1"], {
    env: {
      ...process.env,
      PLAYWRIGHT_EXTERNAL_SERVER: "1",
    },
  });
} finally {
  server.kill();
}
