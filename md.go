package main

import (
	"bytes"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/parser"
	"go.abhg.dev/goldmark/frontmatter"
)

type FrontMatter struct {
	Title   string `yaml:"title"`
	Summary string `yaml:"summary"`
}

type Post struct {
	Title string
	Url   string
}

type blogPost struct {
	FrontMatter
	Html string
}

func parseMarkdown(name string) (blogPost, error) {
	src, err := readPostFunc(name)
	if err != nil {
		return blogPost{}, err
	}
	md := goldmark.New(
		goldmark.WithExtensions(
			&frontmatter.Extender{},
		),
	)
	ctx := parser.NewContext()

	var buf bytes.Buffer
	if err := md.Convert(src, &buf, parser.WithContext(ctx)); err != nil {
		return blogPost{}, err
	}

	var meta FrontMatter
	if err := frontmatter.Get(ctx).Decode(&meta); err != nil {
		return blogPost{}, err
	}

	return blogPost{FrontMatter: meta, Html: buf.String()}, nil
}

func getPosts() ([]Post, error) {
	posts, err := posts.ReadDir("posts")
	if err != nil {
		return nil, err
	}

	var pp []Post
	for _, post := range posts {
		p, err := parseMarkdown("posts/" + post.Name())
		if err != nil {
			return nil, err
		}
		n := post.Name()
		name := n[:len(n)-3]
		pp = append(pp, Post{Title: p.Title, Url: name})
	}

	return pp, nil
}
