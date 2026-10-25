import { defineHandler } from "void";
import { notes } from "../src/content";
import { escapeXml } from "../src/xml";

export const GET = defineHandler(() => new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>Ryan Miville — Notes</title><link>https://rymi.dev/notes</link>
<description>Notes on software, music, and art.</description><language>en-us</language>
<atom:link href="https://rymi.dev/rss.xml" rel="self" type="application/rss+xml"/>
${notes.map((note) => `<item><title>${escapeXml(note.title)}</title><link>https://rymi.dev${escapeXml(note.path)}</link><guid>https://rymi.dev${escapeXml(note.path)}</guid><description>${escapeXml(note.description)}</description>${Number.isNaN(Date.parse(note.date)) ? "" : `<pubDate>${new Date(note.date).toUTCString()}</pubDate>`}</item>`).join("\n")}
</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" } }));
