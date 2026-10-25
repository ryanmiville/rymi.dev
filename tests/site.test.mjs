import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { readContent } from "../scripts/content.ts";

const base = "http://127.0.0.1:5192";
const pages = readContent();
const published = pages.filter((page) => page.data.draft !== true);
const drafts = pages.filter((page) => page.data.draft === true);
let server;
let logs = "";

before(async () => {
  assert.ok(
    existsSync("dist/client/index.html"),
    "Run npm run build before npm test.",
  );
  server = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      "5192",
      "--strictPort",
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, VOID_INSPECTOR_PORT: "false" },
    },
  );
  server.stdout.on("data", (chunk) => {
    logs = (logs + chunk).slice(-5000);
  });
  server.stderr.on("data", (chunk) => {
    logs = (logs + chunk).slice(-5000);
  });
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(logs);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Preview did not start. ${logs}`);
});

after(() => {
  server?.kill("SIGTERM");
});

test("every public page has the shared frame, a title, and its own canonical", async () => {
  const paths = ["/", "/notes", "/work", ...published.map((page) => page.path)];
  const results = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /<title>[^<]+Ryan Miville<\/title>/, path);
      assert.match(html, /aria-label="Main navigation"/, path);
      assert.match(html, /href="\/"[^>]*>Home<\/a>/, path);
      assert.match(html, /<main[^>]+id="main-content"/, path);
      assert.match(html, /<footer/, path);
      assert.ok(
        html.includes(`href="https://rymi.dev${path}"`),
        `Canonical for ${path}`,
      );
      assert.doesNotMatch(
        html,
        /AstroPaper|LOCAL STUDY|Leave a little room|Make the small thing/,
        path,
      );
      return html;
    }),
  );
  const hrefs = new Set(
    results.flatMap((html) =>
      [...html.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)].map(
        (match) => match[1],
      ),
    ),
  );
  for (const href of hrefs)
    assert.equal(
      (await fetch(base + href)).status,
      200,
      `Internal link ${href}`,
    );
});

test("unknown routes return the designed 404 with an actual 404 status", async () => {
  const response = await fetch(`${base}/this-page-does-not-exist`);
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Nothing/);
  assert.match(html, /Back home/);
  assert.match(html, /name="robots" content="noindex"/);
});

test("legacy archive and sitemap URLs retain useful destinations", async () => {
  for (const [path, destination] of [
    ["/posts/", "/notes"],
    ["/tags/", "/notes"],
    ["/search/", "/notes"],
    ["/projects", "/notes?topic=Projects"],
    ["/projects/", "/notes?topic=Projects"],
    ...readContent()
      .filter((page) => page.data.topic === "Projects")
      .map((page) => [page.path.replace("/notes/", "/projects/"), page.path]),
    ["/sitemap-index.xml", "/sitemap.xml"],
    ["/sitemap-0.xml", "/sitemap.xml"],
  ]) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(response.status, 301, path);
    assert.equal(response.headers.get("location"), destination, path);
  }
  const legacyQuery = await fetch(base + "/projects/dq?ref=bookmark", {
    redirect: "manual",
  });
  assert.equal(legacyQuery.headers.get("location"), "/notes/dq?ref=bookmark");
});

test("feed, sitemap, fonts, scripts, and share image are served", async () => {
  for (const path of [
    "/rss.xml",
    "/sitemap.xml",
    "/robots.txt",
    "/appearance.js",
    "/fonts/caveat-600.ttf",
    "/favicon.svg",
    "/og.png",
  ]) {
    assert.equal((await fetch(base + path)).status, 200, path);
  }
  const feed = await (await fetch(base + "/rss.xml")).text();
  assert.match(feed, /<rss version="2.0"/);
  assert.doesNotMatch(feed, /AstroPaper/);
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  for (const page of published)
    assert.ok(sitemap.includes(`https://rymi.dev${page.path}`), page.path);
  assert.ok(!sitemap.includes("/404"));
  assert.ok(!sitemap.includes("/projects"));
  for (const page of published.filter((page) =>
    page.path.startsWith("/notes/"),
  )) {
    assert.ok(
      feed.includes(`https://rymi.dev${page.path}`),
      `Feed includes ${page.path}`,
    );
    assert.equal(
      sitemap.split(`<loc>https://rymi.dev${page.path}</loc>`).length - 1,
      1,
      `One sitemap entry for ${page.path}`,
    );
  }
});

test("home and archive show each published note once, including the empty state", async () => {
  const home = await (await fetch(base)).text();
  const homeEntries = [
    ...home.matchAll(/<a\b[^>]*href="(\/notes\/[^"?#]+)"/g),
  ].map((match) => match[1]);
  assert.equal(
    homeEntries.length,
    Math.min(
      3,
      published.filter((page) => page.path.startsWith("/notes/")).length,
    ),
  );
  assert.equal(
    homeEntries.length,
    new Set(homeEntries).size,
    "Each home entry appears once across all subjects",
  );
  const about = await (await fetch(base + "/about")).text();
  const archive = await (await fetch(base + "/notes")).text();
  assert.doesNotMatch(home, /islands-client.*\.js/);
  assert.doesNotMatch(about, /islands-client.*\.js/);
  assert.match(archive, /islands-client.*\.js/);
  assert.match(archive, /aria-label="Notebook"/);
  if (published.some((page) => page.path.startsWith("/notes/"))) {
    assert.match(archive, /aria-label="Filter notes by subject"/);
    assert.match(archive, /aria-label="Search notes"/);
  } else {
    assert.match(home, /No notes published yet/);
    assert.match(archive, /No notes published yet/);
    assert.doesNotMatch(archive, /aria-label="Search notes"/);
  }
  assert.equal(
    (archive.match(/class="archive-row"/g) || []).length,
    published.filter((page) => page.path.startsWith("/notes/")).length,
  );
});

test("draft URLs and their static variants return 404, including old project links", async () => {
  for (const page of drafts) {
    for (const path of [
      page.path,
      page.path + "/",
      page.path + ".html",
      page.path.replace("/notes/", "/projects/"),
    ]) {
      const response = await fetch(base + path);
      assert.equal(response.status, 404, path);
      assert.ok(!(await response.text()).includes(page.data.description), path);
    }
  }
});

test("draft metadata, bodies, and client scripts are absent from every production artifact", async () => {
  const publicResponses = await Promise.all(
    ["/", "/notes", "/rss.xml", "/sitemap.xml"].map(async (path) =>
      (await fetch(base + path)).text(),
    ),
  );
  function files(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.isDirectory()
        ? files(join(directory, entry.name))
        : [join(directory, entry.name)],
    );
  }
  const artifacts = files("dist").filter((file) =>
    /\.(?:html|js|mjs|map|json|xml)$/.test(file),
  );
  for (const page of drafts) {
    const source = readFileSync(page.file, "utf8");
    const paragraph = source
      .split(/\n---\s*\n|^---\s*\n/)
      .at(-1)
      .trim()
      .split("\n\n")[0];
    for (const content of [
      ...publicResponses,
      ...artifacts.map((file) => readFileSync(file, "utf8")),
    ]) {
      assert.ok(
        !content.includes(page.path),
        `Draft route leaked: ${page.path}`,
      );
      assert.ok(
        !content.includes(page.data.description),
        `Draft description leaked: ${page.path}`,
      );
      assert.ok(
        !content.includes(paragraph),
        `Draft body leaked: ${page.path}`,
      );
    }
  }
  assert.ok(
    !artifacts.some((file) =>
      /md-client|switchboard|pipeline-diagram/.test(file),
    ),
    "No draft-only client entries",
  );
});
