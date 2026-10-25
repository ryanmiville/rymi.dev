<script>
import { initPipelineDiagram } from "@/pipeline-diagram.client";
initPipelineDiagram();
</script>

---
title: "dq"
description: "DuckDB powered pipeline CLI"
date: "2026-03-05"
repoURL: "https://github.com/ryanmiville/dq"
category: "Tools"
kind: "Command line"
icon: "terminal"
slug: "dq"
section: "notes"
draft: true
topic: "Projects"
layout: "project"
---

A shell-first way to work with data. Compose small commands with Unix pipes: read a source, select the columns you need, filter rows, and choose an output format.

Each stage adds to a query plan. DuckDB executes the accumulated plan when it is time to write the results.

<figure class="figure" data-pipeline>
<div class="figure-inner drawn-surface">
<svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg>
<div class="figure-heading"><h2>A query, in the making</h2><span class="micro">Figure 01</span></div>
<div class="diagram-flow" role="group" aria-label="Explore the dq pipeline">
<div class="diagram-step"><button class="diagram-node drawn-surface" aria-pressed="true" data-step="0" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">01</span>Read the data</button><span class="diagram-connector"><svg class="pen-arrow" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
<div class="diagram-step"><button class="diagram-node drawn-surface" aria-pressed="false" data-step="1" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">02</span>Compose the query</button><span class="diagram-connector"><svg class="pen-arrow" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
<div class="diagram-step"><button class="diagram-node drawn-surface" aria-pressed="false" data-step="2" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">03</span>Write the results</button></div>
</div>
<div class="diagram-caption" aria-live="polite" aria-atomic="true"><span class="step-label">Start with a source</span><p>Read a file or standard input. The source data travels through the pipeline alongside the query plan.</p></div>
<noscript><ol class="diagram-fallback"><li><strong>Compose the query.</strong> Select columns, filter rows, or sort results. Each command adds to the plan, rather than running a separate query.</li><li><strong>Write the results.</strong> The final output command executes the accumulated plan with DuckDB and writes results in your chosen format.</li></ol></noscript>
</div>
<figcaption>Small shell commands build one query plan. Select a step to take a closer look.</figcaption>
</figure>

## A pipeline, one step at a time

```sh
printf '{"name":"Ada","age":37}\n{"name":"Linus","age":54}\n' |
  dq from json |
  dq where "age >= 40" |
  dq select "name" |
  dq to json
# {"name":"Linus"}
```

Use `dq sql` to inspect the compiled query without executing it. When the output is a terminal, stages execute the plan and display a readable table.

## Get started

```sh
brew install ryanmiville/tap/dq
```

The [project README](https://github.com/ryanmiville/dq#readme) covers the command set, formats, and optional plugins.
