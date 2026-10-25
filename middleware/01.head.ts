import { defineMiddleware } from "void";
import pages from "@void/md/pages";

export default defineMiddleware(async (c, next) => {
  const path = c.req.path.replace(/\/$/, "") || "/";
  // Drafts are excluded from listings and inaccessible at their direct URL.
  const page = pages.find((entry) => entry.path === path);
  if (page?.frontmatter.draft === true) return c.notFound();
  const canonical = `https://rymi.dev${path === "/" ? "/" : path}`;
  c.set("headDefaults", {
    meta: [
      { property: "og:url", content: canonical },
      { property: "og:title", content: page?.title ? `${page.title} · Ryan Miville` : "Ryan Miville" },
      { property: "og:description", content: typeof page?.frontmatter.description === "string" ? page.frontmatter.description : "Software, data, music, and art." },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: "canonical", href: canonical }],
  });
  await next();
});
