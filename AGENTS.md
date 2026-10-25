# rymi.dev

This is a Void app with React islands and Markdown routes. Read the relevant guide in `node_modules/void/docs/` before changing framework configuration, routing, or rendering. The bundled skill is `node_modules/void/skills/void/SKILL.md`.

Use `design.md` as the visual authority. Preserve its Cobalt palette, Caveat display lettering, crisp body text, authored SVGs, marker filters, and light/dark roles. Follow Ryan’s global web UI skill defaults proportionately.

Keep personal claims grounded in the supplied content or project sources. Prototype copy is not publishable biography or writing. Drafts can live in `pages/notes/` with `draft: true`. They are visible only in local development. Always build and deploy through the npm scripts so draft sources are excluded before Void scans routes and bundles assets.

Run `npm run verify` for implementation changes. Check affected pages in light and dark, at phone widths, and with relevant long-content or empty states. Production is on Cloudflare; deploy with `npm run deploy`. Hosting and DNS changes require an explicit user request.
