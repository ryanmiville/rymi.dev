import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readContent, validateContent } from "../scripts/content.ts";

test("the site's real Markdown passes publication checks", () => {
  const pages = validateContent();
  assert.ok(pages.some((page) => page.path === "/about"));
  assert.ok(pages.some((page) => page.path === "/notes/dq"));
  assert.ok(!pages.some((page) => page.path.startsWith("/projects/")));
});

test("drafts are valid content; ambiguous draft flags fail closed", () => {
  const directory = mkdtempSync(join(tmpdir(), "rymi-content-"));
  try {
    mkdirSync(join(directory, "notes"));
    writeFileSync(
      join(directory, "notes/private.md"),
      '---\ntitle: Private draft\ndescription: Not published\ndate: "2026-10-24"\nsection: notes\nlayout: note\ndraft: true\n---\nA draft.',
    );
    const file = join(directory, "notes/private.md");
    assert.equal(validateContent(directory)[0].data.draft, true);
    for (const flag of ['"true"', '"false"', "yes", "1", "null", ""]) {
      writeFileSync(
        file,
        `---\ntitle: Draft\ndescription: Draft\ndraft: ${flag}\n---\nText`,
      );
      assert.throws(() => validateContent(directory), /YAML boolean/);
    }
  } finally {
    rmSync(directory, { recursive: true });
  }
});

test("Markdown client scripts do not hide the frontmatter from validation", () => {
  const dq = readContent().find((page) => page.path === "/notes/dq");
  assert.equal(dq.data.layout, "project");
  assert.equal(dq.data.section, "notes");
  assert.equal(dq.data.topic, "Projects");
  assert.equal(dq.data.slug, "dq");
});

test("ordinary articles can add subjects without project metadata", () => {
  const directory = mkdtempSync(join(tmpdir(), "rymi-article-"));
  try {
    mkdirSync(join(directory, "notes"));
    const file = join(directory, "notes/listening.md");
    const article =
      '---\ntitle: Listening notes\ndescription: A few observations\ndate: "2026-10-24"\nsection: notes\nlayout: note\ntopic: Music\ntags: [listening]\n---\nA note.';
    writeFileSync(file, article);
    const [page] = validateContent(directory);
    assert.equal(page.path, "/notes/listening");
    assert.equal(page.data.topic, "Music");
    writeFileSync(file, article.replace("topic: Music", "topic: Everything"));
    assert.throws(() => validateContent(directory), /Everything is reserved/);
  } finally {
    rmSync(directory, { recursive: true });
  }
});
