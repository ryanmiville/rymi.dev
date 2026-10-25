import { defineHandler } from "void";
export const GET = defineHandler((c) => c.redirect("/sitemap.xml", 301));
