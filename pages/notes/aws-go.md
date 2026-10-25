---
title: "AWS Go"
description: "Common abstractions for interacting with AWS S3 and DynamoDB in Go"
date: "2020-12-13"
repoURL: "https://github.com/ryanmiville/aws"
category: "Libraries"
kind: "Go library"
icon: "cloud"
slug: "aws-go"
section: "notes"
draft: true
topic: "Projects"
layout: "project"
---

Common Go abstractions for two AWS services: DynamoDB and S3.

## DynamoDB

An iterator for working through the results of a PartiQL query, with a scan helper for iterating over a table. Documents are decoded into Go values as the iterator advances.

## S3

A bucket abstraction with readers and writers that use Go’s `io.ReadCloser` and `io.WriteCloser` interfaces. Close a writer to finish the upload, and close readers when you are done.

See the [repository examples](https://github.com/ryanmiville/aws#readme) for usage.
