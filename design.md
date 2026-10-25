# Cobalt — personal site design guide

Version 1 · 24 October 2026

## Scope and authority

Use this file when building or extending Ryan Miville’s personal site: a home for independent software, art, experiments, and writing. The identity combines an orderly editorial layout with the loose marks of a working sketchbook. Carry that identity across the homepage, archives, project pages, and articles.

These rules record the direction Ryan selected through working prototypes. Preserve that direction during ordinary implementation; introduce a new visual direction only when requested. Explicit new instructions from Ryan take precedence.

The current visual reference is [personal-site.html](personal-site.html). Its CSS and SVGs are inline. The light/dark comparison at [personality-palettes.html](personality-palettes.html) currently renders the same site. Earlier exploration files are historical, not alternative brand references.

This guide is inspired by [Vercel’s design.md approach](https://vercel.com/blog/how-our-agents-build-on-brand-pages-with-design-md): record observable decisions, point to reusable mechanics, and check changes against repeatable scenarios. It does not adopt Vercel’s visual identity.

## Reader and task

Choose the composition around what the visitor came to do.

| Surface | Visitor’s job | Composition |
| --- | --- | --- |
| Home | Understand Ryan’s interests and find something worth exploring | Brief introduction, one art-and-code illustration, three selected projects, recent notes |
| Work archive | Scan an expanding body of work | Searchable, filterable rows with project icon, name, description, category, and drawn arrow |
| Project | Understand the problem, idea, and experience | Clear introduction and context, readable prose, a sketch diagram, a next-project link |
| Notes archive | Find a thought worth reading | Titles and short descriptions in a simple list |
| Article | Follow an idea comfortably | Reading column, clear subheads, occasional explanatory diagrams and margin notes |
| About | Meet the person behind the work | Personal introduction, interests, and a restrained art/code overlap illustration |

Keep the homepage curated as the collection grows. The archive holds the full collection. A spatial map can be a secondary way to explore relationships; it must not become the only way to find entries or require rearranging the entire site whenever an entry is added.

## Identity in five decisions

1. **Orderly layout, loose marks.** Align text and navigation precisely. Put irregularity in the ink strokes, marker edges, and illustrations.
2. **Art and technology together.** Draw meaningful objects and relationships: browser windows, a notebook, overlapping materials, a plant beside code, a thought becoming a prototype.
3. **Handwriting has a role.** Use pen-like lettering for display titles, selected section headings, annotations, and diagram captions. Keep body copy, controls, project names, and metadata crisp.
4. **Cobalt anchors the color.** Coral, green, and golden marker accents add personality in small, repeated roles. Light and dark share those roles.
5. **The drawing helps the idea.** Article diagrams explain something. Decorative marks frame or connect content without interrupting reading or navigation.

The result should feel personal, curious, and considered. Preserve breathing room. Do not turn every surface into a doodle.

## Color system

Use semantic roles rather than picking new hex values per component. These are the selected Cobalt values from the current implementation.

| Role | Existing CSS token | Light | Dark | Use |
| --- | --- | --- | --- | --- |
| Paper | `--paper` | `#fffdf8` | `#171d2b` | Page background |
| Ink | `--ink` | `#262a3a` | `#eceef6` | Main headings and primary labels |
| Reading ink | `--muted` | `#626474` | `#b3bdd0` | Paragraphs and secondary text |
| Metadata ink | `--quiet` | `#626474` | `#b3bdd0` | Small labels and figure numbers |
| Cobalt pen | `--sage` | `#3159bb` | `#98b4ff` | Title accents, links, selected labels, primary sketches |
| Coral pen | `--accent2` | `#d45b44` | `#f69b86` | Orbit, margin loops, secondary sketches |
| Green pen | `--accent3` | `#357b66` | `#8ed0b3` | Plant, material study, reflective annotations |
| Blue marker | `--soft` | `#e7edff` | `#2b3c62` | Selected filters, selected diagram nodes, soft fills |
| Gold marker | `--soft3` | `#ffdc8e` | `#72572d` | Hero underline, small stars, notebook fill |
| Blue wash | `--wash` | `#f4f6ff` | `#202a40` | Quiet supporting surface |
| Green wash | `--wash3` | `#e1f0e8` | `#263f38` | Plant and material fills |
| Rule / outline | `--line` | `#9cafd8` | `#516487` | Dividers and rough outlines |
| Figure surface | `--figure-wash` | `#f4f6ff` | `#202a40` | Outer diagram panel |

`--sage` is a legacy variable name; its selected value is cobalt blue. Do not interpret that name as permission to restore the old sage palette. If renaming it to `--accent`, update every reference together.

Color rules:

- The page is mostly paper and reading ink. Accent colors occupy lettering, strokes, highlights, and small illustrations.
- Use reading ink for prose; pale outline colors are not paragraph colors.
- Preserve the colored-pen roles across routes. Do not invent a new palette for each article.
- Dark mode uses navy paper and lighter pens. It is an intentional palette, not a CSS inversion filter.
- Set `color-scheme` and the browser’s `theme-color` for the active appearance.
- Check text contrast against its actual surface, including marker fills. Target at least 4.5:1 for ordinary text and 3:1 for large text. Color must not be the only signal of a selected control.

## Typography

### Font roles

- **Handwritten:** Caveat. Current embedded font file is weight 600; annotations request 500 but resolve through the supplied face. When packaging fonts separately, provide the actual weights used and retain the SIL Open Font License.
- **Reading and interface:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **Metadata:** `ui-monospace, SFMono-Regular, Menlo, monospace`, uppercase, with approximately `.055em` tracking.

Do not use Comic Sans, Chalkboard, or similarly rounded comic lettering. Ryan explicitly rejected that look. The approved handwriting is loose, slanted, and pen-like. Do not replace it with a playful rounded sans or use handwriting for entire paragraphs.

### Reference sizes

| Element | Desktop | Narrow layouts | Treatment |
| --- | --- | --- | --- |
| Homepage title | 76px; 66px at intermediate width | 68px; 61px below 359px | Caveat 600, line-height `.97`, tracking `-.025em` |
| Article title | 70px | 59px; 53px below 359px | Caveat 600, compact but unclipped |
| Project title | 75px | 62px; 57px below 359px | Caveat 600 |
| Archive / About title | 70px | 59px; 53px below 359px | Caveat 600 |
| Homepage section title | 33px | 26–32px | Caveat 600, line-height `1.1` |
| Project names | 20–25px | 20–23px | System sans; clear, not handwritten |
| Article body | 16px | 16px; 15px at 320px | System sans, line-height `1.9–1.95` |
| Article subheading | 28px | 25–27px | System sans, cobalt, clear section breaks |
| Handwritten annotation | 19–25px | 18–24px | Short phrases, comfortable line-height |
| Diagram heading | 25px | 23px | Caveat |
| Figure caption | 19px | 18px | Caveat, line-height `1.3` |
| Supporting labels | 9–13px | Similar | Metadata only; do not use for reading content |

Titles may wrap. Never clip ascenders or descenders to force a fixed height. Project names and reading text should remain easy to scan beside expressive display lettering.

## Layout and spacing

- Center the main shell at a maximum width of 1080px. Its padding is 40px per side on desktop, 30px below 900px, 23px below 650px, and 18px below 359px.
- Keep article prose approximately 620–660px wide. Project/article outer layouts can reach 850px.
- A diagram may extend roughly 28–40px beyond each side of the reading column when space permits. On phones it returns to the available content width.
- Use a two-column home hero and three project previews on desktop. Below 650px, stack the hero and turn project previews into rows with a small icon column.
- Space hero and major sections generously; reference gaps are 35–65px. Use approximately 20–30px around related groups and 7–16px within small components.
- Use thin rules and spacing to separate archive rows. Avoid enclosing every project, note, or paragraph in a card.
- Keep titles, descriptions, and destinations readable as content grows. Use `minmax(0, 1fr)`, `min-width: 0`, and wrapping where needed.
- Let the footer follow long content and sit low on short pages. Reserve space for fixed controls only when those controls are actually present.

## Drawing vocabulary

Use code-native SVGs with rounded line caps and joins. Reference stroke widths are 1.2–1.5px, with occasional 2.3px emphasis in the hero code mark. Slightly offset secondary strokes can be approximately .6px with .4–.5 opacity.

- Draw deliberately imperfect curves and corners. Keep silhouettes recognizable and geometry stable.
- Prefer a small number of authored paths. Do not jitter paths randomly on every render.
- Use `vector-effect="non-scaling-stroke"` where outlines stretch with the container.
- Keep fill washes soft, with more contrast in the pen stroke than in the fill.
- Use small rotations for marks and annotations, generally 1–6 degrees. Text columns and controls stay aligned.
- Reuse the star wordmark, orbit, loops, and drawing style across the site. Do not invent a different illustration language on each page.
- Put decorative SVGs behind text or beside it, mark them `aria-hidden="true"`, and prevent them from intercepting pointer events.

### Link arrows

Use the existing `.pen-arrow` SVG, not a Unicode arrow or emoji. Phone browsers rendered the earlier arrow characters as glossy blue emoji, which broke the identity.

The approved 28×28 arrow has two authored strokes:

```svg
<svg class="pen-arrow" viewBox="0 0 28 28" fill="none"
     aria-hidden="true" focusable="false">
  <path d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17"
        stroke="currentColor" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" />
  <path d="M5 24Q14 14 24 5M12 7L22 6L22 16"
        stroke="currentColor" stroke-width=".6" opacity=".5"
        stroke-linecap="round" stroke-linejoin="round" />
</svg>
```

Inherit the link color. Keep the SVG from shrinking in flex layouts. Reference sizes are 25px on project rows, 15px inside the primary drawn button, and about 1em within text links. Give it no separate accessible name; the link’s words identify the destination.

### Marker selection

The selected archive filter looks hand-highlighted. Do not restore a perfectly rounded rectangular chip.

Reuse the marker mask in `../work/marker-filters.css` or the current HTML. It uses two uneven passes behind the label:

- Main pass: inset approximately `-1px -3px`, rotation `-1.6deg`, opacity `.9`.
- Overlap pass: inset `2px -1px -3px -4px`, rotation `.8deg`, opacity `.4`.
- Both use the blue marker role, with irregular, softly rounded ends.
- The other filter positions vary the main rotation slightly (`1.2deg` and `-.8deg`).
- Use `isolation: isolate` on the button and `pointer-events: none` on the marks. Include standard and WebKit mask declarations.
- Selection is instant. Preserve `aria-pressed`, a visible keyboard focus outline, and a stable clickable area. The marker’s decorative tilt must not tilt the label or change layout.

## Available primitives

Reuse these existing classes and their behavior before creating a new component. They are implemented in the reference HTML, not in a separately published stylesheet.

| Primitive | Classes | Contract |
| --- | --- | --- |
| Page frame | `.shell`, `.site-header`, `.site-nav`, `.site-footer` | Shared geometry, navigation, and footer |
| Display title | `.page-title`, title `em` | Handwritten heading with cobalt emphasis |
| Labels | `.eyebrow`, `.micro` | Context and metadata subordinate to the content |
| Primary action | `.rough-button` | Slightly doubled drawn frame, soft fill, drawn arrow |
| Text destination | `.text-link`, `.pen-arrow` | Readable text with a small authored arrow |
| Project preview | `.project-preview`, `.preview-top`, `.sketch-icon` | Selected work on home; responsive icon-led row |
| Archive | `.archive-row`, `.filters`, `.filter`, `.search-label` | Scannable collection with working filters/search |
| Note listing | `.note-row` | Title, short description, and clear destination |
| Reading | `.prose`, `.inline-note` | Clean body text with occasional handwritten aside |
| Sketch panel | `.drawn-surface`, `.outline` | Two irregular SVG outlines and a semantic wash |
| Explanation | `.figure`, `.diagram-flow`, `.diagram-node`, `.diagram-caption` | Selectable steps with a changing explanation |

Preserve the same primitive across surfaces. A diagram in a project and a diagram in an article should share strokes, spacing, label hierarchy, and interaction behavior.

## Articles and diagrams

Diagrams are part of the writing. Introduce the idea in prose, show the relationship, then continue the argument. Do not add a diagram merely to fill a gap.

The reference pattern contains a short handwritten heading, figure number, three labeled steps, connecting arrows, a selected-step explanation, and a caption. Use a return loop only when the process actually repeats. New diagrams may use other structures when the content calls for them; preserve the same visual grammar.

- Keep labels in real text rather than baking prose into a bitmap.
- Give interactive steps descriptive button labels and `aria-pressed` state.
- Change the explanation without replacing the focused button. Announce the change politely.
- Make a starting explanation visible before interaction. Essential meaning must not depend on discovering a hover effect.
- Stack steps vertically on phones and use a clear reading order. Avoid shrinking a wide diagram until labels become unreadable.
- Captions explain what the reader should notice. They are not decoration or repeated titles.

## Interaction, motion, and access

- Every destination and control must work. Keep search, category filters, clear/reset, back navigation, and empty results usable.
- Give immediate press feedback. Current controls use approximately `scale(.98)` over 120ms.
- Reserve motion for feedback: a small wordmark tilt or project-icon tilt on hover can take 180ms with `cubic-bezier(.23,1,.32,1)`.
- Animate transform and opacity when motion is needed. Avoid perpetual floating doodles, parallax, cursor effects, and layout-shifting flourishes.
- Gate hover behavior with `(hover: hover) and (pointer: fine)`.
- Honor reduced motion. Keep all content and selected states understandable with animation disabled.
- Maintain visible focus, semantic landmarks, logical heading levels, and a working skip link.
- Aim for 44px touch targets where practical, expanding transparent hit padding rather than making small labels visually heavy. This is a target for further implementation, not a claim that every prototype control already meets it.
- Search inputs use at least 16px text on mobile. Allow zoom and normal vertical scrolling.
- Appearance changes keep the current route, reading position, search/filter state, and selected diagram step.

The bottom dark pill is **prototype comparison chrome**, not the site’s brand navigation. Its styling comes from the prototype skill. Do not copy that pill into unrelated site components or reinterpret it as the intended final appearance-control placement.

## Copy and content

Use direct, personal language with specific purposes. Keep descriptions brief enough to scan and articles useful enough to read. Occasional short handwritten asides can add warmth; avoid filling every margin with whimsical commentary.

Keep project names in the supplied form. Describe what a project does before describing how impressive it is. Never invent achievements, launch status, statistics, testimonials, biography, or project outcomes.

The prototype includes sample article writing and illustrative project descriptions. Those are layout examples, not verified publishable claims about Ryan. Replace or confirm them before a real launch.

## Failure patterns to avoid

| Failure | Observable correction |
| --- | --- |
| Comic lettering everywhere | Caveat for display/annotation; system sans for reading and interface |
| Bland monochrome sketchbook | Cobalt plus recurring coral, green, and gold roles |
| Doodles scattered indiscriminately | Attach each mark to a heading, illustration, annotation, or relationship |
| Glossy arrow emoji on phones | Authored inline SVG with inherited color |
| Perfect selected-filter chip | Irregular marker mask with a translucent second pass |
| Homepage becomes a growing map | Curated home, scalable list archive, optional secondary map |
| Every item is a boxed card | Aligned rows, whitespace, and thin dividers |
| Dark mode is inverted light mode | Use the explicit dark tokens and recheck fills and text |
| New page becomes a separate brand | Reuse the same typography, pens, marker, and diagram primitives |
| Tactility becomes machinery | Express it through strokes, marks, response, and composition; avoid a radio/desk simulator |

## Repeatable review scenarios

Keep prompts, sample content, viewport, and appearance fixed when comparing a design-rule change. Save a baseline before changing a rule. Compare the resulting pages, not just the prose in this document.

| Scenario | Fixed task | Check |
| --- | --- | --- |
| Home | Intro, three projects, two notes | Clear hierarchy; art/code identity; controlled doodles; no clipping |
| Archive | Everything, Tools, Studies; search with zero results | Marker follows selection; counts and reset work; drawn link arrows |
| Article | “Leave a little room,” with step two selected | Readable prose; shared diagram style; caption and focus survive appearance change |
| Project | Switchboard detail | Context and purpose readable before diagram; next destination clear |
| Growth | 24 archive entries; one realistic long title and description | Home stays curated; archive scales; labels wrap without hiding actions |
| Phone | Home, archive, article at 390px and 320px | No horizontal overflow; all controls reachable; diagram stacks; no emoji substitution |
| Appearance | Same routes in light and dark | Text, fills, active controls, and browser theme agree |
| Access | Keyboard, 200% zoom, reduced motion | Visible focus; text remains available; no motion-dependent information |

Mechanical checks should catch overflow, missing destinations, missing selected-state attributes, arrow characters used in link icons, and font or color drift. Human review decides whether the page still has the right hierarchy, restraint, and personality.

These scenarios are a proposed regression set. This document does not claim that a matched design.md evaluation or every scenario above has already been run.

When Ryan approves a new correction, update the narrowest relevant place: judgment here, repeatable mechanics in the shared component/CSS, and mechanically detectable failures in checks. Recheck affected surfaces in both appearances before broadening the rule.

## Before handing off a page

- Use Cobalt’s exact semantic colors and approved font roles.
- Check the actual rendered page in light and dark, at desktop and phone widths.
- Exercise changed controls and the relevant empty/long-content states.
- Confirm the marker selection and drawn arrows render as authored on mobile.
- Keep sample copy distinguishable from confirmed personal content.
- Preserve the site’s identity while composing for this page’s reader and task.
