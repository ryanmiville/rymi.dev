import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readContent, validateContent } from "../scripts/content.ts";

test("the site's real Markdown passes publication checks", () => {
  const pages = validateContent();
  assert.ok(pages.some((page) => page.path === "/about"));
  assert.ok(pages.some((page) => page.path === "/projects/dq"));
});

test("a draft cannot silently become a prerendered public route", () => {
  const directory = mkdtempSync(join(tmpdir(), "rymi-content-"));
  try {
    mkdirSync(join(directory, "notes"));
    writeFileSync(
      join(directory, "notes/private.md"),
      "---\ntitle: Private draft\ndescription: Not published\ndraft: true\n---\nA draft.",
    );
    assert.throws(
      () => validateContent(directory),
      /Keep unpublished drafts outside pages/,
    );
  } finally {
    rmSync(directory, { recursive: true });
  }
});

test("Markdown client scripts do not hide the frontmatter from validation", () => {
  const dq = readContent().find((page) => page.path === "/projects/dq");
  assert.equal(dq.data.layout, "project");
  assert.equal(dq.data.slug, "dq");
});
