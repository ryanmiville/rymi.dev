import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import {
  existsSync,
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { join, resolve } from "node:path";
import {
  createProductionSource,
  runProduction,
} from "../scripts/production.mjs";
import { assertProductionSource, readContent } from "../scripts/content.ts";
import { startServer, stopServer } from "./server.mjs";

const root = resolve(".");
const notes = readContent().filter((page) => page.path.startsWith("/notes/"));
const drafts = readContent().filter((page) => page.data.draft === true);
let dev;
before(async () => {
  dev = await startServer(root, 5193, "dev");
});
after(async () => {
  await stopServer(dev?.child);
});

function artifacts(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? artifacts(join(directory, entry.name))
      : /\.(html|js|mjs|map|json)$/.test(entry.name)
        ? [readFileSync(join(directory, entry.name), "utf8")]
        : [],
  );
}
const note = (flag, body = "An ordinary public note.") =>
  `---\ntitle: Publication fixture\ndescription: Testing publication\ndate: "2026-10-24"\nsection: notes\nlayout: note\n${flag}\n---\n\n${body}`;

test("local development lists and renders every draft with preview labels and robots protection", async () => {
  const home = await (await fetch(dev.base)).text();
  const archive = await (await fetch(dev.base + "/notes")).text();
  if (
    notes
      .toSorted((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date))
      .slice(0, 3)
      .some((page) => page.data.draft === true)
  )
    assert.match(home, /Draft ·/);
  assert.equal(
    (archive.match(/class="archive-row"/g) || []).length,
    notes.length,
  );
  if (drafts.length) assert.match(archive, /Draft ·/);
  for (const page of drafts) {
    assert.ok(archive.includes(page.path), page.path);
    const response = await fetch(dev.base + page.path);
    assert.equal(response.status, 200, page.path);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(response.headers.get("cache-control"), "no-store");
    const html = await response.text();
    assert.match(html, /Draft · Local preview only/);
    if (page.data.topic === "Projects") {
      assert.match(html, /class="project-page"/);
      assert.match(html, /Source on GitHub/);
    }
    assert.ok(html.includes(page.data.description), page.path);
    if (page.path.endsWith("/dq")) {
      assert.match(html, /data-md-script="notes\/dq"/);
      assert.match(html, /Explore the dq pipeline/);
    }
    if (page.path.endsWith("/switchboard")) {
      assert.match(html, /data-md-script="notes\/switchboard"/);
      assert.match(html, /Explore the Switchboard handoff/);
    }
    for (const path of ["/rss.xml", "/sitemap.xml"]) {
      const xml = await (await fetch(dev.base + path)).text();
      assert.ok(!xml.includes(page.path), `No local draft in ${path}`);
    }
  }
});

test("production staging excludes Markdown and companions, preserves sources, and supports publishing", () => {
  if (drafts.length)
    assert.throws(
      () => assertProductionSource(root),
      /Use npm run build or npm run deploy/,
    );
  else assertProductionSource(root);
  const first = createProductionSource(root);
  try {
    assert.equal(first.drafts.length, drafts.length);
    assert.ok(existsSync(join(first.directory, "pages/about.md")));
    for (const page of notes)
      assert.equal(
        existsSync(join(first.directory, "pages", page.path.slice(1) + ".md")),
        page.data.draft !== true,
        page.path,
      );
    assert.ok(!existsSync(join(first.directory, ".env")));
    assert.ok(!existsSync(join(first.directory, "dist")));
    assertProductionSource(first.directory);
    const folder = join(first.directory, "pages/notes");
    mkdirSync(join(folder, "nested"));
    writeFileSync(
      join(folder, "nested/private.md"),
      '<script>console.log("secret")</script>\n\n' + note("draft: true"),
    );
    writeFileSync(
      join(folder, "nested/private.server.ts"),
      'throw new Error("must never run");',
    );
    writeFileSync(join(folder, "_unlisted.md"), note(""));
    writeFileSync(join(folder, "published.md"), note("draft: false"));
    writeFileSync(join(folder, "without-flag.md"), note(""));
    const next = createProductionSource(first.directory);
    try {
      const pages = readContent(join(next.directory, "pages"));
      assert.ok(pages.some((page) => page.path === "/notes/published"));
      assert.ok(pages.some((page) => page.path === "/notes/without-flag"));
      assert.ok(
        !existsSync(
          join(next.directory, "pages/notes/nested/private.server.ts"),
        ),
      );
      assert.ok(!existsSync(join(next.directory, "pages/notes/_unlisted.md")));
      assert.ok(
        !existsSync(join(next.directory, "pages/notes/nested/private.md")),
      );
      assert.ok(
        existsSync(join(folder, "nested/private.md")),
        "Source remains available locally",
      );
    } finally {
      rmSync(next.directory, { recursive: true, force: true });
    }
    writeFileSync(join(folder, "published.md"), note("draft: true"));
    const unpublished = createProductionSource(first.directory);
    try {
      assert.ok(
        !existsSync(join(unpublished.directory, "pages/notes/published.md")),
      );
    } finally {
      rmSync(unpublished.directory, { recursive: true, force: true });
    }
  } finally {
    rmSync(first.directory, { recursive: true, force: true });
  }
  assert.equal(
    readContent().filter((page) => page.data.draft === true).length,
    drafts.length,
  );
});

test(
  "a mixed production build publishes articles and interactive projects while omitting draft text and scripts",
  { timeout: 90000 },
  async () => {
    const fixture = createProductionSource(root).directory;
    let preview;
    try {
      const folder = join(fixture, "pages/notes");
      for (const entry of readdirSync(folder))
        if (!entry.startsWith("index."))
          rmSync(join(folder, entry), { recursive: true, force: true });
      writeFileSync(
        join(folder, "published.md"),
        note("", "PUBLIC_NOTE_BODY_8a93"),
      );
      writeFileSync(
        join(folder, "private.md"),
        '<script>console.log("DRAFT_CLIENT_SECRET_8a93")</script>\n\n' +
          note("draft: true", "DRAFT_BODY_SECRET_8a93"),
      );
      writeFileSync(
        join(folder, "dq.md"),
        readFileSync(join(root, "pages/notes/dq.md"), "utf8").replace(
          "draft: true",
          "draft: false",
        ),
      );
      // A clean build must replace stale artifacts left by an earlier publication.
      mkdirSync(join(fixture, "dist/client"), { recursive: true });
      writeFileSync(
        join(fixture, "dist/client/private.html"),
        "STALE_DRAFT_SECRET_8a93",
      );
      await runProduction("build", fixture);
      const output = artifacts(join(fixture, "dist")).join("\n");
      assert.ok(output.includes("PUBLIC_NOTE_BODY_8a93"));
      assert.ok(!output.includes("DRAFT_BODY_SECRET_8a93"));
      assert.ok(!output.includes("DRAFT_CLIENT_SECRET_8a93"));
      assert.ok(!output.includes("STALE_DRAFT_SECRET_8a93"));
      assert.ok(!existsSync(join(fixture, "dist/client/private.html")));
      preview = await startServer(fixture, 5194);
      const article = await fetch(preview.base + "/notes/published");
      assert.equal(article.status, 200);
      const html = await article.text();
      assert.match(html, /PUBLIC_NOTE_BODY_8a93/);
      assert.doesNotMatch(html, /draft-notice/);
      const project = await (await fetch(preview.base + "/notes/dq")).text();
      assert.match(project, /data-md-script="notes\/dq"/);
      assert.match(project, /Explore the dq pipeline/);
      assert.doesNotMatch(project, /class="next-project"/);
      const archive = await (await fetch(preview.base + "/notes")).text();
      assert.equal((archive.match(/class="archive-row"/g) || []).length, 2);
      assert.doesNotMatch(archive, /Draft ·/);
      for (const path of ["/", "/rss.xml", "/sitemap.xml"]) {
        const text = await (await fetch(preview.base + path)).text();
        assert.ok(text.includes("/notes/published"), path);
        assert.ok(text.includes("/notes/dq"), path);
        assert.ok(!text.includes("/notes/private"), path);
      }
      assert.equal((await fetch(preview.base + "/notes/private")).status, 404);
    } finally {
      await stopServer(preview?.child);
      rmSync(fixture, { recursive: true, force: true });
    }
  },
);
