import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { validateContent } from "./content.ts";

// Void 1.2 scans every Markdown file before building routes, metadata, and
// client entries. Build from a clean source snapshot so drafts reach none of
// those scanners. Never move or rename files in the author's working tree.
export function createProductionSource(root) {
  const pages = validateContent(join(root, "pages"));
  const drafts = pages.filter((page) => page.data.draft === true);
  const omitted = new Set(drafts.map((page) => resolve(page.file)));
  for (const page of drafts) {
    const stem = page.file.slice(0, -3);
    for (const extension of ["ts", "tsx", "js", "jsx"])
      omitted.add(`${stem}.server.${extension}`);
  }
  const directory = mkdtempSync(join(tmpdir(), "rymi-production-"));
  try {
    for (const entry of [
      "pages",
      "routes",
      "middleware",
      "src",
      "content",
      "public",
      "scripts",
      "package.json",
      "tsconfig.json",
      "vite.config.ts",
      "void.config.ts",
      "void.lock.json",
    ]) {
      const source = join(root, entry);
      if (!existsSync(source)) continue;
      cpSync(source, join(directory, entry), {
        recursive: true,
        filter: (file) => {
          if (omitted.has(resolve(file))) return false;
          // @void/md also scans underscore-prefixed Markdown even though Void
          // doesn't make it a route. Keep it out of public metadata as well.
          return !(
            entry === "pages" &&
            file.endsWith(".md") &&
            relative(join(root, "pages"), file)
              .split(/[\\/]/)
              .some((part) => part.startsWith("_"))
          );
        },
      });
    }
    // Reuse installed dependencies, without copying credentials, caches, or dist.
    symlinkSync(
      join(root, "node_modules"),
      join(directory, "node_modules"),
      "dir",
    );
    const destination = join(root, ".void/project.json");
    if (existsSync(destination)) {
      mkdirSync(join(directory, ".void"), { recursive: true });
      cpSync(destination, join(directory, ".void/project.json"));
    }
    return { directory, drafts };
  } catch (error) {
    rmSync(directory, { recursive: true, force: true });
    throw error;
  }
}

// Generated preview configuration contains absolute build paths. Rebase these
// when returning the finished artifact to the working tree for npm run preview.
function copyBuild(directory, root) {
  function rebaseConfig(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = join(folder, entry.name);
      if (entry.isDirectory()) rebaseConfig(file);
      else if (entry.name === "wrangler.json")
        writeFileSync(
          file,
          readFileSync(file, "utf8").replaceAll(directory, root),
        );
    }
  }
  const built = join(directory, "dist");
  if (!existsSync(built))
    throw new Error("Production build did not produce dist/.");
  rebaseConfig(built);
  rmSync(join(root, "dist"), { recursive: true, force: true });
  cpSync(built, join(root, "dist"), { recursive: true });
  const pointer = [
    join(directory, ".void/preview-deploy-config.json"),
    join(directory, ".wrangler/deploy/config.json"),
  ].find(existsSync);
  if (!pointer)
    throw new Error("Production build did not produce preview configuration.");
  mkdirSync(join(root, ".void"), { recursive: true });
  writeFileSync(
    join(root, ".void/preview-deploy-config.json"),
    readFileSync(pointer, "utf8").replaceAll(directory, root),
  );
}

export async function runProduction(mode, root) {
  if (!["build", "deploy"].includes(mode))
    throw new Error("Expected build or deploy.");
  const { directory, drafts } = createProductionSource(root);
  console.log(
    `Production source: excluded ${drafts.length} draft${drafts.length === 1 ? "" : "s"}.`,
  );
  try {
    // Resolve CLI entry points from package bin declarations rather than relying
    // on undocumented paths inside Void.
    const packageName = mode === "build" ? "vite" : "void";
    const manifest = JSON.parse(
      readFileSync(
        join(root, "node_modules", packageName, "package.json"),
        "utf8",
      ),
    );
    const bin =
      typeof manifest.bin === "string"
        ? manifest.bin
        : manifest.bin[packageName];
    const cli = resolve(root, "node_modules", packageName, bin);
    await new Promise((done, reject) => {
      const child = spawn(
        process.execPath,
        [
          cli,
          ...(mode === "build"
            ? ["build"]
            : ["deploy", "--platform", "cloudflare"]),
        ],
        {
          cwd: directory,
          stdio: "inherit",
          env: process.env,
        },
      );
      const stop = (signal) => child.kill(signal);
      const onInterrupt = () => stop("SIGINT");
      const onTerminate = () => stop("SIGTERM");
      process.on("SIGINT", onInterrupt);
      process.on("SIGTERM", onTerminate);
      const cleanup = () => {
        process.off("SIGINT", onInterrupt);
        process.off("SIGTERM", onTerminate);
      };
      child.once("error", (error) => {
        cleanup();
        reject(error);
      });
      child.once("exit", (code, signal) => {
        cleanup();
        if (code === 0) done();
        else
          reject(new Error(`Production ${mode} failed (${signal || code}).`));
      });
    });
    copyBuild(directory, root);
    if (mode === "deploy") {
      for (const entry of ["void.lock.json", ".void/project.json"])
        if (existsSync(join(directory, entry)))
          cpSync(join(directory, entry), join(root, entry));
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    await runProduction(
      process.argv[2],
      resolve(dirname(fileURLToPath(import.meta.url)), ".."),
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
