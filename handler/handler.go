package handler

import (
	"embed"
	"fmt"

	"github.com/gofiber/fiber/v2"
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
	return c.Render("views/index", fiber.Map{}, "views/layouts/base")
}

func (h *Handler) About(c *fiber.Ctx) error {
	return c.Render("views/about", fiber.Map{}, "views/layouts/base")
}

func (h *Handler) Blog(c *fiber.Ctx) error {
	posts, err := h.md.Posts()
	if err != nil {
		return err
	}
	return c.Render("views/blog", fiber.Map{"Posts": posts}, "views/layouts/base")
}

func (h *Handler) BlogPost(c *fiber.Ctx) error {
	name := fmt.Sprintf("posts/%s.md", c.Params("slug"))
	content, err := h.md.Parse(name)
	if err != nil {
		return err
	}

	return c.Render("views/post", fiber.Map{"Content": content}, "views/layouts/base")
}

func (h *Handler) Error(c *fiber.Ctx, err error) error {
	return c.Render("views/error", fiber.Map{}, "views/layouts/base")
}
