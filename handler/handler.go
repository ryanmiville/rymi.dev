package handler

import (
	"embed"
	"fmt"

	"github.com/a-h/templ"
	"github.com/gofiber/fiber/v2"
	"github.com/ryanmiville/rymi.dev/components"
	"github.com/ryanmiville/rymi.dev/markdown"
)

func New(f embed.FS) *Handler {
	return &Handler{
		md: markdown.Markdown{FS: f},
	}
}

type Handler struct {
	md markdown.Markdown
}

func (h *Handler) Index(c *fiber.Ctx) error {
	return render(components.Home(c), c)
}

func (h *Handler) About(c *fiber.Ctx) error {
	return render(components.About(c), c)
}

func (h *Handler) Blog(c *fiber.Ctx) error {
	posts, err := h.md.Posts()
	if err != nil {
		return err
	}
	return render(components.Blog(c, posts), c)
}

func (h *Handler) BlogPost(c *fiber.Ctx) error {
	name := fmt.Sprintf("posts/%s.md", c.Params("slug"))
	content, err := h.md.Parse(name)
	if err != nil {
		return err
	}

	return render(components.BlogPost(c, content), c)
}

func (h *Handler) Error(c *fiber.Ctx, err error) error {
	return render(components.ErrorPage(c), c)
}

func render(comp templ.Component, c *fiber.Ctx) error {
	c.Context().SetContentType(fiber.MIMETextHTMLCharsetUTF8)
	return comp.Render(c.Context(), c)
}
