import { defineHandler } from "void";
import { notes, projects } from "../src/content";
import { escapeXml } from "../src/xml";

export const GET = defineHandler(() => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/projects", "/notes", "/about", "/work", ...projects.map((p) => p.path), ...notes.map((n) => n.path)].map((path) => `<url><loc>https://rymi.dev${escapeXml(path)}</loc></url>`).join("")}</urlset>`, {
  headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
}));
