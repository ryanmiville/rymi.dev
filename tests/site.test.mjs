import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readContent } from "../scripts/content.ts";

const base = "http://127.0.0.1:5192";
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
    { stdio: ["ignore", "pipe", "pipe"] },
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
  const paths = [
    "/",
    "/projects",
    "/notes",
    "/work",
    ...readContent().map((page) => page.path),
  ];
  const results = await Promise.all(
    paths.map(async (path) => {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /<title>[^<]+Ryan Miville<\/title>/, path);
      assert.match(html, /aria-label="Main navigation"/, path);
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
    ["/search/", "/projects"],
    ["/sitemap-index.xml", "/sitemap.xml"],
    ["/sitemap-0.xml", "/sitemap.xml"],
  ]) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(response.status, 301, path);
    assert.equal(response.headers.get("location"), destination, path);
  }
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
  for (const page of readContent())
    assert.ok(sitemap.includes(`https://rymi.dev${page.path}`), page.path);
  assert.ok(!sitemap.includes("/404"));
});

test("static reading pages avoid the full app runtime; interactive pages get their entry", async () => {
  const home = await (await fetch(base)).text();
  const about = await (await fetch(base + "/about")).text();
  const project = await (await fetch(base + "/projects/dq")).text();
  const archive = await (await fetch(base + "/projects")).text();
  assert.doesNotMatch(home, /islands-client.*\.js/);
  assert.doesNotMatch(about, /islands-client.*\.js/);
  assert.match(archive, /islands-client.*\.js/);
  assert.match(project, /md-client.*\.js/);
  assert.match(project, /data-md-script="projects\/dq"/);
});
