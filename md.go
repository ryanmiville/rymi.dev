package main

import (
	"bytes"
	"os"

	"github.com/yuin/goldmark"
)

func parseFromDisk(name string) string {
	src, err := os.ReadFile(name)
	if err != nil {
		panic(err)
	}

	var buf bytes.Buffer
	if err := goldmark.Convert(src, &buf); err != nil {
		panic(err)
	}

	return buf.String()
}

func parse(name string) string {
	src, err := articles.ReadFile(name)
	if err != nil {
		panic(err)
	}
	var buf bytes.Buffer
	if err := goldmark.Convert(src, &buf); err != nil {
		panic(err)
	}

	return buf.String()
}
