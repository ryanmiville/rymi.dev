package components

import (
	"bytes"
	"embed"

	"github.com/a-h/templ"
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

type PostContent struct {
	FrontMatter
	Html templ.Component
}

func ParseMarkdown(f embed.FS, name string) (PostContent, error) {
	src, err := f.ReadFile(name)
	if err != nil {
		return PostContent{}, err
	}
	md := goldmark.New(
		goldmark.WithExtensions(
			&frontmatter.Extender{},
		),
	)
	ctx := parser.NewContext()

	var buf bytes.Buffer
	if err := md.Convert(src, &buf, parser.WithContext(ctx)); err != nil {
		return PostContent{}, err
	}

	var meta FrontMatter
	if err := frontmatter.Get(ctx).Decode(&meta); err != nil {
		return PostContent{}, err
	}

	return PostContent{FrontMatter: meta, Html: Unsafe(buf.String())}, nil
}

func GetPosts(f embed.FS) ([]Post, error) {
	posts, err := f.ReadDir("posts")
	if err != nil {
		return nil, err
	}

	var pp []Post
	for _, post := range posts {
		p, err := ParseMarkdown(f, "posts/"+post.Name())
		if err != nil {
			return nil, err
		}
		n := post.Name()
		name := n[:len(n)-3]
		pp = append(pp, Post{Title: p.Title, Url: name})
	}

	return pp, nil
}
