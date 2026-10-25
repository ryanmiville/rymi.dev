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
    if (page.data.draft === true)
      fail(
        "Keep unpublished drafts outside pages/. Every Markdown file in pages/ is a public route.",
      );
    for (const key of ["title", "description"]) {
      if (typeof page.data[key] !== "string" || !page.data[key].trim())
        fail(`Missing ${key} frontmatter.`);
    }
    const kind = page.path.startsWith("/projects/")
      ? "project"
      : page.path.startsWith("/notes/")
        ? "note"
        : null;
    if (!kind) continue;
    if (page.data.layout !== kind) fail(`Use layout: ${kind}.`);
    if (page.data.section !== (kind === "project" ? "projects" : "notes"))
      fail("Set section to the archive name for navigation.");
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
