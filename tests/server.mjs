import { spawn } from "node:child_process";
import { join } from "node:path";

export async function startServer(root, port, mode = "preview") {
  const child = spawn(
    process.execPath,
    [
      join(root, "node_modules/vite/bin/vite.js"),
      ...(mode === "preview" ? ["preview"] : []),
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
      "--strictPort",
    ],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, VOID_INSPECTOR_PORT: "false" },
    },
  );
  let logs = "";
  for (const stream of [child.stdout, child.stderr])
    stream.on("data", (chunk) => {
      logs = (logs + chunk).slice(-6000);
    });
  const base = `http://127.0.0.1:${port}`;
  try {
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
      if (child.exitCode !== null) throw new Error(logs);
      try {
        if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok)
          return { base, child };
      } catch {}
      await new Promise((done) => setTimeout(done, 100));
    }
    throw new Error(`Server did not start. ${logs}`);
  } catch (error) {
    child.kill("SIGTERM");
    throw error;
  }
}

export async function stopServer(child) {
  if (!child || child.exitCode !== null) return;
  await new Promise((done) => {
    child.once("exit", done);
    child.kill("SIGTERM");
  });
}
