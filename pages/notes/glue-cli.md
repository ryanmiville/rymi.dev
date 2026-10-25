---
title: "AWS Glue CLI"
description: "CLI to interact with AWS Glue written in Rust"
date: "2023-12-11"
repoURL: "https://github.com/ryanmiville/glue"
category: "Tools"
kind: "Command line"
icon: "terminal"
slug: "glue-cli"
section: "notes"
topic: "Projects"
layout: "project"
---

A Rust command-line interface for working with AWS Glue services.

## From the terminal

The CLI can run a Glue job, backfill a date range, or create a Jupyter notebook configured for an interactive Glue session.

```sh
glue --help
```

Configure AWS credentials in your environment first. Use `--profile` to select an AWS profile.

The [project README](https://github.com/ryanmiville/glue#readme) has the command reference and prerequisites.
