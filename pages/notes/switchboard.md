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
topic: "Projects"
layout: "project"
---

A link is easy to open in the wrong place when work and personal browsing live in different profiles. Switchboard is a small macOS menu-bar utility for getting that URL into the browser profile where it belongs.

It handles links opened from other apps and gives the tab in front of you a shorter path to another profile.

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
