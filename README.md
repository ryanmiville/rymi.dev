# rymi.dev

Ryan Miville’s personal site. Built with Void, React islands, and `@void/md`, using the Cobalt design system in [design.md](./design.md).

## Local development

Use Node.js 24 or newer.

```sh
npm ci
npm run dev
```

The development server runs at <http://localhost:5180>. The prototype reference can continue to run separately on port 4173.

```sh
npm run typecheck
npm run build
npm test
```

Or run all three with `npm run verify`. Tests start and stop their own production preview on port 5192. `npm run preview` serves the production build on port 5180; stop the development server first.

## Content

- `pages/projects/*.md`: project descriptions and metadata; the archive and curated homepage read `@void/md/pages`.
- `pages/notes/*.md`: published notes, automatically included in the notebook, home, RSS, and sitemap.
- `pages/about.md`: personal introduction.
- `content/experience.json`: work history.
- `src/content.ts`: archive metadata and the three selected homepage projects.

Add a note with a filename that matches its URL, for example `pages/notes/a-note.md`:

```md
---
title: A note
description: A short description of the idea.
date: "2026-10-24"
section: notes
layout: note
tags: [software]
---

Write the note here. The layout supplies its title, description, and date.
```

Keep drafts **outside `pages/`** until they are ready to publish. A Markdown file in `pages/` is a real public route; the content check rejects `draft: true` during development and build to prevent accidentally prerendering it.

Projects use `layout: project`, `section: projects`, a `slug` matching their filename, and `category`, `kind`, `icon`, `repoURL`, and optional `demoURL` metadata. Available sketch icons are `terminal`, `music`, `cloud`, and `trace`.

The app imports `@void/md/theme-content.css`; prose is scoped to `.void-md` and uses Cobalt’s typography and color tokens. Markdown client scripts use the `@/` alias for source imports. The dq diagram is progressively enhanced through that supported client-script path; its initial explanation also renders without JavaScript.

## Design

Follow [design.md](./design.md). Shared sketches are authored SVG paths, and Caveat is self-hosted with its license in `public/fonts/OFL.txt`. Light, dark, and system appearance are available in the footer. Static reading pages ship HTML; the project archive adds a React island for search and category filters.

Regenerate the social sharing image with `npm run og` after changing its source in `scripts/generate-og.mjs`.

## Hosting

Production is hosted on Cloudflare at <https://rymi.dev>. Both `rymi.dev` and `www.rymi.dev` are Custom Domains on the `rymi-dev` Worker; `www` redirects to the apex while preserving paths and query strings.

Pages are prerendered into `dist/client/`. The Worker handles RSS, sitemap, and routing, and Void manages its cache binding. Account and domain settings live in `void.config.ts`; resource IDs live in `void.lock.json`. Keep the lock file with the source when moving to another machine or setting up CI. Credentials stay outside the repository.

Deploy updates with:

```sh
npm run verify
npm run deploy
```

Deployment uses the pinned Cloudflare account and requires a valid local Cloudflare session or the `CLOUDFLARE_API_TOKEN` environment variable. The Workers preview is <https://rymi-dev.ryanmiville.workers.dev>. See [hosting notes](./docs/hosting.md) for the migration record and rollback details.

For framework changes, use the version-matched guides in `node_modules/void/docs/` and the bundled Void skill at `node_modules/void/skills/void/SKILL.md`.
