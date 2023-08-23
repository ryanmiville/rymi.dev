package main

import (
	"bytes"

	"github.com/yuin/goldmark"
)

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
