package markdown

import (
	"bytes"
	"context"
	"embed"
	"io"

	"github.com/a-h/templ"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/parser"
	"go.abhg.dev/goldmark/frontmatter"
)

// FS should be set before calling any functions
var FS embed.FS

type FrontMatter struct {
	Title   string `yaml:"title"`
	Summary string `yaml:"summary"`
}

type Post struct {
	Title string
	Url   string
}

type Content struct {
	FrontMatter
	Html templ.Component
}

func Parse(name string) (Content, error) {
	src, err := FS.ReadFile(name)
	if err != nil {
		return Content{}, err
	}
	md := goldmark.New(
		goldmark.WithExtensions(
			&frontmatter.Extender{},
		),
	)
	ctx := parser.NewContext()

	var buf bytes.Buffer
	if err := md.Convert(src, &buf, parser.WithContext(ctx)); err != nil {
		return Content{}, err
	}

	var meta FrontMatter
	if err := frontmatter.Get(ctx).Decode(&meta); err != nil {
		return Content{}, err
	}

	return Content{FrontMatter: meta, Html: unsafe(buf.String())}, nil
}

func Posts() ([]Post, error) {
	posts, err := FS.ReadDir("posts")
	if err != nil {
		return nil, err
	}

	var pp []Post
	for _, post := range posts {
		p, err := Parse("posts/" + post.Name())
		if err != nil {
			return nil, err
		}
		n := post.Name()
		name := n[:len(n)-3]
		pp = append(pp, Post{Title: p.Title, Url: name})
	}

	return pp, nil
}

func unsafe(html string) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, w io.Writer) (err error) {
		_, err = io.WriteString(w, html)
		return
	})
}
