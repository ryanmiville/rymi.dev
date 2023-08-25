package main

import (
	"bytes"

	"github.com/yuin/goldmark"
)

func parseMarkdown(name string) (string, error) {
	src, err := readPostFunc(name)
	if err != nil {
		return "", err
	}
	var buf bytes.Buffer
	if err := goldmark.Convert(src, &buf); err != nil {
		return "", err
	}

	return buf.String(), nil
}
