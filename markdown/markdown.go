package markdown

import (
	"bytes"
	"embed"
	"html/template"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/parser"
	"go.abhg.dev/goldmark/frontmatter"
)

type Markdown struct {
	embed.FS
}

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
	Html template.HTML
}

func (md *Markdown) Parse(name string) (Content, error) {
	src, err := md.FS.ReadFile(name)
	if err != nil {
		return Content{}, err
	}
	gm := goldmark.New(
		goldmark.WithExtensions(
			&frontmatter.Extender{},
		),
	)
	ctx := parser.NewContext()

	var buf bytes.Buffer
	if err := gm.Convert(src, &buf, parser.WithContext(ctx)); err != nil {
		return Content{}, err
	}

	var meta FrontMatter
	if err := frontmatter.Get(ctx).Decode(&meta); err != nil {
		return Content{}, err
	}

	return Content{FrontMatter: meta, Html: template.HTML(buf.String())}, nil
}

func (md *Markdown) Posts() ([]Post, error) {
	posts, err := md.FS.ReadDir("posts")
	if err != nil {
		return nil, err
	}

	var pp []Post
	for _, post := range posts {
		p, err := md.Parse("posts/" + post.Name())
		if err != nil {
			return nil, err
		}
		n := post.Name()
		name := n[:len(n)-3]
		pp = append(pp, Post{Title: p.Title, Url: name})
	}

	return pp, nil
}
