import { defineConfig } from "void/config";

export default defineConfig({
  target: "cloudflare",
  output: "static",
  worker: { compatibility_date: "2026-10-19" },
  inference: { bindings: { db: false } },
  head: {
    title: "Ryan Miville",
    titleTemplate: "%s · Ryan Miville",
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "description",
        content:
          "Software, data, music, and art. The personal site of Ryan Miville.",
      },
      { name: "color-scheme", content: "light dark" },
      { name: "theme-color", content: "#fffdf8" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ryan Miville" },
      { property: "og:image", content: "https://rymi.dev/og.png" },
    ],
    link: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      {
        rel: "preload",
        href: "/fonts/caveat-600.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Ryan Miville — Notes",
        href: "/rss.xml",
      },
    ],
    script: [{ src: "/appearance.js" }],
  },
  cloudflare: {
    name: "rymi-dev",
    account_id: "1186c5d9a74b232e0cbcb344452bafb7",
    workers_dev: true,
    preview_urls: true,
    routes: [
      { pattern: "rymi.dev", custom_domain: true },
      { pattern: "www.rymi.dev", custom_domain: true },
    ],
  },
  routing: {
    notFound: "404-page",
    redirects: {
      "https://www.rymi.dev/*": { to: "https://rymi.dev/:splat", status: 301 },
      "/projects": { to: "/notes?topic=Projects", status: 301 },
      "/projects/": { to: "/notes?topic=Projects", status: 301 },
      "/projects/*": { to: "/notes/:splat", status: 301 },
      "/posts": { to: "/notes", status: 301 },
      "/posts/": { to: "/notes", status: 301 },
      "/tags": { to: "/notes", status: 301 },
      "/tags/*": { to: "/notes", status: 301 },
      "/search": { to: "/notes", status: 301 },
      "/search/": { to: "/notes", status: 301 },
      "/sitemap-0.xml": { to: "/sitemap.xml", status: 301 },
    },
  },
});
