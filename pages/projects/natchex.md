---
title: "Natchex"
description: "An extension of the Natchez library for tracing in Scala."
date: "2022-05-28"
repoURL: "https://github.com/ryanmiville/natchex"
category: "Libraries"
kind: "Scala library"
icon: "trace"
slug: "natchex"
section: "projects"
layout: "project"
status: "Archived"
---

An extension of Natchez’s tracing API for Scala, adding new trace roots and tracing for `Resource` and `Stream`.

::: info Archived
Most of these ideas are now part of Natchez. This repository is archived.
:::

## Tracing a stream

One motivating use case is tracing an operation within an infinite stream, such as processing batches from a Kafka topic. A new root creates a scope for its child spans; the previous span takes over again when that scope ends.

The [project README](https://github.com/ryanmiville/natchex#readme) describes the API, its origins, and its limitations.
