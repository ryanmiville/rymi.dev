<script>
import { initSwitchboardDiagram } from "@/switchboard-diagram.client";
initSwitchboardDiagram();
</script>

---
title: "Switchboard"
description: "A small macOS utility for opening links in the right browser profile."
date: "2026-01-17"
repoURL: "https://github.com/ryanmiville/switchboard"
category: "Tools"
kind: "macOS utility"
icon: "trace"
slug: "switchboard"
section: "notes"
draft: true
topic: "Projects"
layout: "project"
---

A link is easy to open in the wrong place when work and personal browsing live in different profiles. Switchboard is a small macOS menu-bar utility for getting that URL into the browser profile where it belongs.

It handles links opened from other apps and gives the tab in front of you a shorter path to another profile.

<figure class="figure" data-switchboard>
<div class="figure-inner drawn-surface">
<svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg>
<div class="figure-heading"><h2>A sketch of the experience</h2><span class="micro">Figure 01</span></div>
<div class="diagram-flow" role="group" aria-label="Explore the Switchboard handoff">
<div class="diagram-step"><button type="button" class="diagram-node drawn-surface" aria-label="Step 1: The tab you’re in" aria-pressed="true" data-step="0" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">01</span>The tab you’re in</button><span class="diagram-connector"><svg class="pen-arrow" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false"><path d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
<div class="diagram-step"><button type="button" class="diagram-node drawn-surface" aria-label="Step 2: The profile you need" aria-pressed="false" data-step="1" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">02</span>The profile you need</button><span class="diagram-connector"><svg class="pen-arrow" viewBox="0 0 28 28" fill="none" aria-hidden="true" focusable="false"><path d="M5 23Q13 14 23 5M11 6Q18 4 23 5Q22 12 23 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
<div class="diagram-step"><button type="button" class="diagram-node drawn-surface" aria-label="Step 3: Right where you want it" aria-pressed="false" data-step="2" disabled><svg class="outline" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5Q147 1 295 6L294 175Q147 179 4 173Z"/><path d="M2 7Q155 5 297 3L296 177Q146 176 6 176Z"/></svg><span class="micro">03</span>Right where you want it</button></div>
</div>
<div class="diagram-caption" aria-live="polite" aria-atomic="true"><span class="step-label">Start where you are</span><p>The useful context is already in front of you. Begin with the current tab you want to open in another profile.</p></div>
<noscript><ol class="diagram-fallback"><li><strong>Make one clear choice.</strong> Choose the browser and profile for this task. Favorites keep regular destinations close.</li><li><strong>Carry on.</strong> The same URL opens in the chosen profile, using its login and session. Your original tab stays open.</li></ol></noscript>
<div class="figure-legend"><span class="micro">Select a step to follow the idea</span><span class="micro">A rough sketch, a clear path</span></div>
</div>
<figcaption>A change of scenery.</figcaption>
</figure>

## A shorter handoff

1. **Start with the current tab.** With a supported Chromium browser focused, press **Control–Option–Space** to open Switchboard’s destination picker.
2. **Choose the profile you need.** Pick a browser and profile. Favorites appear first, with **Command–1**, **Command–2**, and so on for quick selection.
3. **Open the same page there.** The URL opens in the selected profile with that profile’s own login and session. The original tab stays open.

The shortcut is customizable, and the picker can show only the destinations you use. A manual selection applies to that opening without changing your routing rules.

## Give links a destination

Set Switchboard as the default browser to route links from other apps. Rules can match a domain and its subdomains, part of a URL, or an exact URL, then open it in a chosen browser and profile.

Rules run in order, with the first match deciding the destination. Unmatched links use the configured default. A preview in Settings shows where a URL would go before opening it.

## At home on the Mac

Switchboard stays in the menu bar and can launch at login. macOS asks for Automation access when it first reads a browser’s current tab; the picker also accepts a pasted URL.

It requires macOS 13 or newer and a supported Chromium browser. The [repository README](https://github.com/ryanmiville/switchboard#readme) has build, installation, and configuration instructions.
