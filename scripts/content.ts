import { readFileSync, readdirSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export function readContent(
  pagesDir = fileURLToPath(new URL("../pages", import.meta.url)),
) {
  function walk(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.name.startsWith("_")
        ? []
        : entry.isDirectory()
          ? walk(join(directory, entry.name))
          : entry.name.endsWith(".md")
            ? [join(directory, entry.name)]
            : [],
    );
  }
  return walk(pagesDir).map((file) => {
    const source = readFileSync(file, "utf8").replace(
      /^\s*<script\b[^>]*>[\s\S]*?<\/script>\s*/,
      "",
    );
    const { data } = matter(source);
    const path =
      "/" +
      relative(pagesDir, file)
        .replace(/\\/g, "/")
        .replace(/\.md$/, "")
        .replace(/\/index$/, "");
    return { file, path, data };
  });
}

export function validateContent(pagesDir?: string) {
  const pages = readContent(pagesDir);
  for (const page of pages) {
    const fail = (message: string): never => {
      throw new Error(`${page.path}: ${message}`);
    };
    if (page.data.draft !== undefined && typeof page.data.draft !== "boolean")
      fail("Use draft: true or draft: false (a YAML boolean, without quotes).");
    for (const key of ["title", "description"]) {
      if (typeof page.data[key] !== "string" || !page.data[key].trim())
        fail(`Missing ${key} frontmatter.`);
    }
    if (page.path.startsWith("/projects/"))
      fail("Publish project write-ups in notes/ with topic: Projects.");
    if (!page.path.startsWith("/notes/")) continue;
    const kind = page.data.topic === "Projects" ? "project" : "note";
    if (page.data.layout !== kind) fail(`Use layout: ${kind}.`);
    if (page.data.section !== "notes")
      fail("Set section: notes for navigation.");
    if (
      page.data.topic !== undefined &&
      (typeof page.data.topic !== "string" ||
        !page.data.topic.trim() ||
        page.data.topic === "Everything")
    )
      fail(
        "Use a nonempty topic; Everything is reserved for the archive filter.",
      );
    if (
      page.data.tags !== undefined &&
      (!Array.isArray(page.data.tags) ||
        page.data.tags.some((tag: unknown) => typeof tag !== "string"))
    )
      fail("Tags must be an array of strings.");
    if (
      typeof page.data.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(page.data.date) ||
      Number.isNaN(Date.parse(page.data.date))
    )
      fail("Use a quoted date in YYYY-MM-DD format.");
    if (kind === "project") {
      for (const key of ["category", "kind", "icon", "repoURL"]) {
        if (typeof page.data[key] !== "string" || !page.data[key].trim())
          fail(`Missing ${key} frontmatter.`);
      }
      if (page.data.slug !== basename(page.file, ".md"))
        fail("The slug must match the Markdown filename.");
    }
  }
  return pages;
}

export function assertProductionSource(root: string) {
  const drafts = validateContent(join(root, "pages")).filter(
    (page) => page.data.draft === true,
  );
  if (drafts.length)
    throw new Error(
      "Drafts must be excluded before Void scans pages. Use npm run build or npm run deploy.",
    );
}
