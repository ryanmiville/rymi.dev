import { defineMiddleware } from "void";
import pages from "@void/md/pages";

export default defineMiddleware(async (c, next) => {
  const path = c.req.path.replace(/\/$/, "") || "/";
  const page = pages.find((entry) => entry.path === path);
  const draft = page?.frontmatter.draft === true;
  if (draft && !import.meta.env.DEV) return c.notFound();
  if (draft) {
    c.header("X-Robots-Tag", "noindex, nofollow");
    c.header("Cache-Control", "no-store");
  }
  const canonical = `https://rymi.dev${path === "/" ? "/" : path}`;
  c.set("headDefaults", {
    meta: [
      ...(draft ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:url", content: canonical },
      {
        property: "og:title",
        content: page?.title ? `${page.title} · Ryan Miville` : "Ryan Miville",
      },
      {
        property: "og:description",
        content:
          typeof page?.frontmatter.description === "string"
            ? page.frontmatter.description
            : "Software, data, music, and art.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    link: [{ rel: "canonical", href: canonical }],
  });
  await next();
});
